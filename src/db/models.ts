import { FieldValue, Timestamp } from "firebase/firestore"

export interface HabitPenalty {
    name: string
    points: number
}

export interface HabitPenaltyRecord extends HabitPenalty {
    date: Timestamp
}

export interface HabitPlan {
    id: string
    userId: string
    name: string
    emoji: string
    planPeriod: 'Daily' | 'Weekly' | 'Monthly'
    penalties: HabitPenalty[]
    createdDate: Timestamp | FieldValue
    updatedDate: Timestamp | FieldValue
    isDefault: boolean
}

export interface HabitPlanRecord {
    userId: string
    habitPlanId: string
    penalties: HabitPenaltyRecord[]
}

export interface HabitPlanRecords {
    habitId: string;
    records: HabitPlan[];
}


export interface HabitDayPoints {
    date: Date;
    points: number;
}

