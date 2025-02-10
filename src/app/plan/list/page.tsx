'use client'

import { getHabitPlans } from '@/db/habits'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from '@/core/context/auth-context'
import { PlanList } from '@/app/plan/list/components/plan-list'
import { Text } from 'rizzui/typography'
export default function Plans() {
  const { user } = useAuth()
  const { data: habitPlans, isLoading } = useQuery({
    queryKey: ['habitPlans', user?.uid],
    queryFn: () => (user?.uid ? getHabitPlans(user.uid) : Promise.resolve([])),
    enabled: !!user?.uid,
  })

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <div className="text-center">
        <Text className="text-2xl font-semibold">All Plans</Text>
      </div>
      <PlanList habitPlans={habitPlans} />
    </div>
  )
}
