import { addPenaltyToHabitPlanRecord } from '@/db/habits'
import { PenaltyItem } from './penalty-item'
import { HabitPenalty, HabitPlan } from '@/db/models'
import { Timestamp } from 'firebase/firestore'
import { useAuth } from '@/core/context/auth-context'
import toast from 'react-hot-toast'

export function Penalty({ habitPlan }: { habitPlan: HabitPlan }) {
  const { user } = useAuth()

  async function handlePenaltyClick(penalty: HabitPenalty) {
    if (!habitPlan?.id || !user?.uid) return

    try {
      const newPenaltyRecord = {
        ...penalty,
        date: Timestamp.fromDate(new Date()),
      }

      await addPenaltyToHabitPlanRecord({
        userId: user.uid,
        habitPlanId: habitPlan.id,
        date: new Date(),
        penalty: newPenaltyRecord,
      })

      toast.success('Penalty recorded')
    } catch (error) {
      toast.error('Failed to record penalty')
      console.error('Error recording penalty:', error)
    }
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-4">Penalties</h2>
      {habitPlan.penalties.map((penalty, index) => (
        <PenaltyItem
          key={`${penalty.name}-${index}`}
          penalty={penalty}
          onPenaltyClick={handlePenaltyClick}
        />
      ))}
    </div>
  )
}
