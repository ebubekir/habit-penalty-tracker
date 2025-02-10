'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { addHabitPlan } from '@/db/habits'
import { HabitPenalty } from '@/db/models'
import { useAuth } from '@/core/context/auth-context'
import { FaPlus } from 'react-icons/fa'
import { DEFAULT_EMOJI, EMOJI_OPTIONS } from '@/core/emoji-options'

export default function CreateHabitPlan() {
  const router = useRouter()
  const { user } = useAuth()
  const [name, setName] = useState('')
  const [emoji, setEmoji] = useState(DEFAULT_EMOJI)
  const [penalties, setPenalties] = useState<HabitPenalty[]>([])
  const [newPenaltyName, setNewPenaltyName] = useState('')
  const [newPenaltyPoints, setNewPenaltyPoints] = useState('')
  const [isDefault, setIsDefault] = useState(true) // Add this line

  const handleAddPenalty = () => {
    if (newPenaltyName && newPenaltyPoints) {
      setPenalties([
        ...penalties,
        {
          name: newPenaltyName,
          points: Number(newPenaltyPoints),
        },
      ])
      setNewPenaltyName('')
      setNewPenaltyPoints('')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user?.uid) return

    try {
      await addHabitPlan({
        userId: user.uid,
        name,
        emoji,
        planPeriod: 'Daily',
        penalties,
        isDefault,
      })
      router.push('/')
    } catch (error) {
      console.error('Error creating habit plan:', error)
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Create Habit Plan</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100"
      >
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Choose Emoji
            </label>
            <div className="flex gap-2 flex-wrap">
              {EMOJI_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => setEmoji(option)}
                  className={`text-2xl p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${
                    emoji === option
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'border-2 border-transparent'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Plan Name
            </label>
            <div className="flex gap-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-50 rounded-lg border border-gray-200">
                {emoji}
              </div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="flex-1 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
                placeholder="Enter plan name"
                required
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-800">Penalties</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={newPenaltyName}
              onChange={(e) => setNewPenaltyName(e.target.value)}
              placeholder="What's the penalty?"
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
            />
            <div className="flex gap-4">
              <input
                type="number"
                value={newPenaltyPoints}
                onChange={(e) => setNewPenaltyPoints(e.target.value)}
                placeholder="Points"
                className="flex-1 sm:w-32 px-4 py-3 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 bg-gray-50 hover:bg-white"
              />
              <button
                type="button"
                onClick={handleAddPenalty}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 whitespace-nowrap font-medium flex items-center gap-2"
              >
                <FaPlus className="text-sm" />
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {penalties.map((penalty, index) => (
              <div
                key={index}
                className="flex items-center justify-between bg-gray-50 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-200"
              >
                <span className="font-medium text-gray-700">{penalty.name}</span>
                <span className="text-red-600 font-semibold bg-red-50 px-3 py-1 rounded-full text-sm">
                  {penalty.points} points
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isDefault"
            checked={isDefault}
            onChange={(e) => setIsDefault(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label htmlFor="isDefault" className="text-sm font-medium text-gray-700">
            Set as default habit plan
          </label>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium text-lg mt-6"
        >
          Create Habit Plan
        </button>
      </form>
    </div>
  )
}
