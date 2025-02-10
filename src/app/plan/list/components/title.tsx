import { HabitPlan } from '@/db/models'
import { Title, Badge } from 'rizzui'

export function PlanTitle({ plan }: { plan: HabitPlan }) {
  return (
    <div className="flex items-center gap-2">
      <Title as="h3" className="text-lg font-semibold">
        {plan.name}
      </Title>
      {plan.isDefault && (
        <Badge variant="flat" className="bg-blue-100 px-2 py-1 text-blue-700">
          Default
        </Badge>
      )}
    </div>
  )
}
