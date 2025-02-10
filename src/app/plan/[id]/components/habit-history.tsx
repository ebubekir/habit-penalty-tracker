import { useAuth } from '@/core/context/auth-context'
import { getHabitPlanPointsByDateRange } from '@/db/habits'
import { HabitPlan } from '@/db/models'
import { useQuery } from '@tanstack/react-query'
import { Table } from 'rizzui'
import { format } from 'date-fns'

export function HabitHistory({ habitPlan }: { habitPlan: HabitPlan }) {
  const { user } = useAuth()

  const { data: historyStats, isLoading } = useQuery({
    queryKey: ['getHabitPlanPointsByDateRange', habitPlan?.id, user?.uid],
    queryFn: () =>
      getHabitPlanPointsByDateRange({
        userId: user!.uid,
        habitPlanId: habitPlan!.id,
      }),
    enabled: !!habitPlan?.id && !!user?.uid,
  })

  if (!habitPlan) return null
  if (isLoading)
    return (
      <div className="w-full p-4">
        <div className="animate-pulse space-y-3">
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-32 bg-gray-100 rounded-lg" />
        </div>
      </div>
    )
  if (!historyStats?.length)
    return (
      <div className="w-full p-6 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-500">No history available yet</p>
      </div>
    )

  return (
    <div className="w-full space-y-4 bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">History</h3>
      </div>
      <div className="p-2 overflow-x-auto">
        <Table className="w-full">
          <Table.Header>
            <Table.Row className="bg-gray-50 text-left">
              <Table.Head className="text-sm font-medium text-gray-700 px-2 py-1">
                Date
              </Table.Head>
              <Table.Head className="text-sm font-medium text-gray-700 px-2 py-1">
                Points
              </Table.Head>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {historyStats.map((day) => (
              <Table.Row
                key={day.date.toISOString()}
                className="hover:bg-gray-50 transition-colors"
              >
                <Table.Cell className="text-sm text-left text-gray-600 px-2 py-1">
                  {format(day.date, 'MMM dd, yyyy')}
                </Table.Cell>
                <Table.Cell className="text-sm font-medium text-left px-2 py-1">
                  {100 - day.points}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}
