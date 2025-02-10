import { BiEdit } from 'react-icons/bi'

export function EditPlanButton({ planId }: { planId: string }) {
  return (
    <a
      href={`/plan/edit/${planId}`}
      className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
    >
      <span>Edit Plan</span>
      <BiEdit className="inline-block" />
    </a>
  )
}
