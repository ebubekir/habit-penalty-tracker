'use client'

import { HabitPlan } from '@/db/models'
import { getHabitPlan, getHabitPlanPointsForToday } from '@/db/habits'
import { useAuth } from '@/core/context/auth-context'
import { TodayPenalties } from './today-penalties'
import { DailyScore } from './daily-score'
import { Penalty } from './penalty'
import { useQuery } from '@tanstack/react-query'
import { HabitHistory } from './habit-history'
import { BiEdit } from 'react-icons/bi'
import { EditPlanButton } from './edit-plan-button'

export default function Plan({ planId }: { planId: string }) {
  const { user } = useAuth()

  const { data: todayStats } = useQuery({
    queryKey: ['getHabitPlanPointsForToday', planId, user?.uid],
    queryFn: () =>
      getHabitPlanPointsForToday({
        userId: user!.uid,
        habitPlanId: planId,
      }),
    enabled: !!planId && !!user?.uid,
  })

  const { data: habitPlan } = useQuery({
    queryKey: ['getHabitPlan', planId, user?.uid],
    queryFn: () => getHabitPlan(planId),
    enabled: !!planId && !!user?.uid,
  })

  if (!habitPlan) return null

  return (
    <div className="max-w-md mx-auto p-4 text-center">
      <DailyScore score={100 - (todayStats?.totalPoints || 0)} />
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold">{habitPlan.name}</h3>
        <EditPlanButton planId={planId} />
      </div>
      <Penalty habitPlan={habitPlan} />
      <TodayPenalties penaltyRecords={todayStats?.penalties || []} />
      <HabitHistory habitPlan={habitPlan} />
    </div>
  )
}
