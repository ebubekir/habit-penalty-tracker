import { HabitPenalty } from '@/db/models'
import { Badge } from 'rizzui/badge'

export function PlanPenalties({ penalties }: { penalties: HabitPenalty[] }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {penalties.map((penalty, index) => (
        <Badge key={index} variant="flat" className="bg-red-50 text-red-600 px-2 py-1">
          {penalty.name}: -{penalty.points} pts
        </Badge>
      ))}
    </div>
  )
}
