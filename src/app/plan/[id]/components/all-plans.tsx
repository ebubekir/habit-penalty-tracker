import { BiHome } from 'react-icons/bi'

export function AllPlans() {
  return (
    <a href="/plan/list" className="flex items-center gap-2">
      <BiHome className="w-10 h-10 opacity-50 m-auto" />
    </a>
  )
}
