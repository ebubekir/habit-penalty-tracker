import { FiCalendar } from 'react-icons/fi'

import { HabitPlan } from '@/db/models'
import { FiClock } from 'react-icons/fi'
import { formatDistance } from 'date-fns'
import { toDate } from '@/core/helpers'
import { Text } from 'rizzui'

export function PlanDateInfo({ plan }: { plan: HabitPlan }) {
  return (
    <div className="flex items-center gap-4 text-gray-600">
      <div className="flex items-center gap-1">
        <FiCalendar className="w-4 h-4" />
        <Text className="text-sm">{plan.planPeriod}</Text>
      </div>
      <div className="flex items-center gap-1">
        <FiClock className="w-4 h-4" />
        <Text className="text-sm">
          Updated{' '}
          {formatDistance(new Date(toDate(plan.updatedDate)), new Date(), {
            addSuffix: true,
          })}
        </Text>
      </div>
    </div>
  )
}
