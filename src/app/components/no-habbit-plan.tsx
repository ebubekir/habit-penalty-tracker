import { CiLemon } from 'react-icons/ci'
import { Empty } from 'rizzui/empty'

export default function NoHabbitPlan() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center  text-center gap-4">
      <Empty
        image={
          <CiLemon
            size={250}
            className="opacity-50 flex  items-center m-auto justify-center"
          />
        }
        text="You haven't created any habit plans yet. Start by creating your first plan to
        track your habits."
      />
      <a
        href="/create-habbit-plan"
        className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
      >
        Create Habit Plan
      </a>
    </div>
  )
}
