import { Text } from 'rizzui'
import { useAuth } from '@/core/context/auth-context'
import { format } from 'date-fns'

export default function Greeting() {
  const { user } = useAuth()
  const today = new Date()
  return (
    <div className="text-center">
      <Text className="text-2xl font-semibold">
        Welcome, {user?.displayName || 'Guest'}
      </Text>
      <Text className="text-gray-500">{format(today, 'EEEE, MMMM d, yyyy')}</Text>
    </div>
  )
}
