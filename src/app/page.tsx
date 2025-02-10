'use client'

import { useAuth } from '@/core/context/auth-context'
import { useQuery } from '@tanstack/react-query'
import { getHabitPlans } from '@/db/habits'
import WelcomeSection from './components/greeting'
import NoHabbitPlan from './components/no-habbit-plan'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const { user } = useAuth()
  const { data: habitPlans, isLoading } = useQuery({
    queryKey: ['habitPlans', user?.uid],
    queryFn: () => (user?.uid ? getHabitPlans(user.uid) : Promise.resolve([])),
    enabled: !!user?.uid,
  })
  const router = useRouter()

  useEffect(() => {
    if (isLoading) return

    if (habitPlans?.length === 0) {
      router.push('/plan/create')
      return
    }

    const defaultPlan = habitPlans?.find((plan) => plan.isDefault)
    if (defaultPlan) {
      router.push(`/plan/${defaultPlan.id}`)
      return
    }

    router.push('/plan/list')
  }, [habitPlans, isLoading, router])

  if (isLoading)
    return (
      <div className="p-4 max-w-md mx-auto space-y-6">
        <WelcomeSection />
        <div className="space-y-4">
          <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
          <div className="h-32 bg-gray-200 animate-pulse rounded-lg" />
        </div>
      </div>
    )

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <WelcomeSection />
      {habitPlans?.length === 0 && <NoHabbitPlan />}
    </div>
  )
}
