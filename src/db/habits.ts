import { 
    collection, 
    doc, 
    addDoc, 
    updateDoc, 
    query, 
    where, 
    getDocs,
    serverTimestamp,
    arrayUnion 
} from 'firebase/firestore'
import { db } from '@/config/firebase'
import type { HabitPlan, HabitPenalty, HabitPlanRecord, HabitPenaltyRecord, HabitDayPoints } from './models'
import { getDoc, writeBatch } from 'firebase/firestore'

const HABIT_PLANS_COLLECTION = 'habitPlans'
const HABIT_RECORDS_COLLECTION = 'habitRecords'

export async function addHabitPlan({ 
    userId, 
    name,
    emoji,
    planPeriod, 
    penalties,
    isDefault
}: Omit<HabitPlan, 'id' | 'createdDate' | 'updatedDate'>) {
    const habitPlanRef = await addDoc(collection(db, HABIT_PLANS_COLLECTION), {
        userId,
        name,
        emoji,
        planPeriod,
        penalties,
        createdDate: serverTimestamp(),
        updatedDate: serverTimestamp(),
        isDefault: isDefault || false
    })
    
    return habitPlanRef.id
}

export async function addPenaltyToHabitPlan(habitPlanId: string, penalty: HabitPenalty) {
    const habitPlanRef = doc(db, HABIT_PLANS_COLLECTION, habitPlanId)
    await updateDoc(habitPlanRef, {
        penalties: arrayUnion(penalty),
        updatedDate: serverTimestamp()
    })
}

export async function addHabitPlanRecord({
    userId,
    habitPlanId,
    date,
    penalties
}: {
    userId: string
    habitPlanId: string
    date: Date
    penalties: HabitPenaltyRecord[]
}) {
    await addDoc(collection(db, HABIT_RECORDS_COLLECTION), {
        userId,
        habitPlanId,
        date,
        penalties,
        createdDate: serverTimestamp()
    })
}

export async function addPenaltyToHabitPlanRecord({
    userId,
    habitPlanId,
    date,
    penalty
}: {
    userId: string
    habitPlanId: string
    date: Date
    penalty: HabitPenaltyRecord
}) {
    const q = query(
        collection(db, HABIT_RECORDS_COLLECTION),
        where('userId', '==', userId),
        where('habitPlanId', '==', habitPlanId),
    )
    
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) {
        // If no record exists for this date, create a new one
        await addHabitPlanRecord({
            userId,
            habitPlanId,
            date,
            penalties: [penalty]
        })
    } else {
        // If record exists, update it with the new penalty
        const recordDoc = querySnapshot.docs[0]
        const recordRef = doc(db, HABIT_RECORDS_COLLECTION, recordDoc.id)
        await updateDoc(recordRef, {
            penalties: arrayUnion(penalty)
        })
    }
}


export async function getHabitPlans(userId: string) {
    const q = query(
        collection(db, HABIT_PLANS_COLLECTION),
        where('userId', '==', userId)
    )
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    })) as HabitPlan[]
}

export async function setHabitPlanAsDefault(userId: string, habitPlanId: string) {
    // First, remove default from all user's habit plans
    const userHabitPlans = await getHabitPlans(userId)
    
    const batch = writeBatch(db)
    
    // Remove default from all plans
    userHabitPlans.forEach(plan => {
        if (plan.isDefault) {
            const planRef = doc(db, HABIT_PLANS_COLLECTION, plan.id)
            batch.update(planRef, { 
                isDefault: false,
                updatedDate: serverTimestamp()
            })
        }
    })
    
    // Set new default plan
    const newDefaultPlanRef = doc(db, HABIT_PLANS_COLLECTION, habitPlanId)
    batch.update(newDefaultPlanRef, { 
        isDefault: true,
        updatedDate: serverTimestamp()
    })
    
    await batch.commit()
}


export async function getHabitPlanPointsForToday({
    userId,
    habitPlanId
}: {
    userId: string
    habitPlanId: string
}): Promise<{
    totalPoints: number
    penalties: HabitPenaltyRecord[]
}> {
    const today = new Date().setHours(0,0,0,0) / 1000
    
    const q = query(
        collection(db, HABIT_RECORDS_COLLECTION),
        where('userId', '==', userId),
        where('habitPlanId', '==', habitPlanId)
    )
    
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return {
        totalPoints: 0,
        penalties: []
    }

    const record = querySnapshot.docs[0].data() as HabitPlanRecord
    
    // Filter penalties for today
    const todayPenalties = record.penalties.filter(penalty => {
        const penaltyDate = new Date(penalty.date.toDate()).getTime() / 1000
        return penaltyDate >= today && penaltyDate < today + 86400
    })

    const totalPoints = todayPenalties.reduce((sum, penalty) => sum + penalty.points, 0)

    return {
        totalPoints,
        penalties: todayPenalties
    }
}


export async function getHabitPlanPointsByDateRange({
    userId,
    habitPlanId,
}: {
    userId: string
    habitPlanId: string
}): Promise<HabitDayPoints[]> {
    const q = query(
        collection(db, HABIT_RECORDS_COLLECTION),
        where('userId', '==', userId),
        where('habitPlanId', '==', habitPlanId)
    )
    
    const querySnapshot = await getDocs(q)
    
    if (querySnapshot.empty) return []

    const records = querySnapshot.docs.map(doc => doc.data() as HabitPlanRecord)
    
    // Create a map to store points by date
    const pointsByDate = new Map<string, HabitDayPoints>()
    
    // Aggregate penalties for each date
    records.forEach(record => {
        record.penalties.forEach(penalty => {
            const date = penalty.date.toDate()
            const dateKey = date.toISOString().split('T')[0]
            
            const existing = pointsByDate.get(dateKey)
            if (existing) {
                existing.points += penalty.points

            } else {
                pointsByDate.set(dateKey, {
                    date,
                    points: penalty.points,
                })
            }
        })
    })
    
    // Convert map to array and sort by date (oldest to newest)
    return Array.from(pointsByDate.values())
        .sort((a, b) => a.date.getTime() - b.date.getTime())
}

export async function getHabitPlan(habitPlanId: string): Promise<HabitPlan | null> {
    const habitPlanRef = doc(db, HABIT_PLANS_COLLECTION, habitPlanId)
    const habitPlanDoc = await getDoc(habitPlanRef)
    if (!habitPlanDoc.exists()) return null


    return {
        id: habitPlanDoc.id,
        ...habitPlanDoc.data()
    } as HabitPlan
}



export async function updateHabitPlan({
    habitPlanId,
    name,
    emoji,
    penalties
}: {
    habitPlanId: string
} & Partial<Pick<HabitPlan, 'name' | 'emoji' | 'penalties'>>) {
    const habitPlanRef = doc(db, HABIT_PLANS_COLLECTION, habitPlanId)
    
    const updates: Partial<HabitPlan> = {
        updatedDate: serverTimestamp()
    }
    
    if (name) updates.name = name
    if (emoji) updates.emoji = emoji
    if (penalties) updates.penalties = penalties
    
    await updateDoc(habitPlanRef, updates)
}