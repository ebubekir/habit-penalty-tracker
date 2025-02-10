'use client'

import WelcomeSection from '@/app/components/greeting'
import { useParams } from 'next/navigation'
import Plan from './components/plan'
import { AllPlans } from './components/all-plans'

export default function PlanPage() {
  const params = useParams()
  const planId = params.id as string

  return (
    <div className="p-4 max-w-md mx-auto space-y-6">
      <WelcomeSection />
      <Plan planId={planId} />
      <AllPlans />
    </div>
  )
}
