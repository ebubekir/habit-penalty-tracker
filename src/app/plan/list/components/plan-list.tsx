import { HabitPlan } from '@/db/models'
import { useRouter } from 'next/navigation'
import { DeletePlanButton } from './delete-plan-button'
import { PlanTitle } from './title'
import { PlanDateInfo } from './plan-date-info'
import { PlanPenalties } from './plan-penalties'

export function PlanList({ habitPlans }: { habitPlans?: HabitPlan[] }) {
  const router = useRouter()
  return (
    <div className="space-y-4">
      {habitPlans?.map((plan) => (
        <div
          key={plan.id}
          onClick={() => router.push(`/plan/${plan.id}`)}
          className="relative p-4 bg-white rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
        >
          <DeletePlanButton planId={plan.id} />
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <PlanTitle plan={plan} />
              <PlanDateInfo plan={plan} />
              {plan.penalties.length > 0 && <PlanPenalties penalties={plan.penalties} />}
            </div>
            <div className="flex items-center justify-center">
              <span className="text-4xl">{plan.emoji}</span>
            </div>
          </div>
        </div>
      ))}
      <a
        href="/plan/create"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Habit Plan
      </a>
    </div>
  )
}
