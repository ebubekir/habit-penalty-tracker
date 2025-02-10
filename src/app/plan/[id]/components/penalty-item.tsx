import { HabitPenalty } from '@/db/models'
import { Button } from 'rizzui/button'

export function PenaltyItem({
  penalty,
  onPenaltyClick,
}: {
  penalty: HabitPenalty
  onPenaltyClick: (penalty: HabitPenalty) => void
}) {
  return (
    <Button
      variant="outline"
      className="w-full mb-2 p-4 flex justify-between items-center"
      onClick={() => onPenaltyClick(penalty)}
    >
      <span>{penalty.name}</span>
      <span className="text-red-500">-{penalty.points}</span>
    </Button>
  )
}
