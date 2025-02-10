export function DailyScore({ score }: { score: number }) {
  return (
    <div className="flex flex-col items-center justify-center p-6 mb-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
      <h2 className="text-lg font-semibold mb-2">Today&#39;s Score</h2>
      <span className="text-4xl font-bold">{score}</span>
    </div>
  )
}
