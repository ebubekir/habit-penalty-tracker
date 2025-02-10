import { CgClose } from 'react-icons/cg'

export function DeletePlanButton() {
  return (
    <button
      type="button"
      // onClick={() =>   (index)}
      className="absolute -top-3 -right-2 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors duration-200"
    >
      <CgClose className="w-5 h-5" />
    </button>
  )
}
