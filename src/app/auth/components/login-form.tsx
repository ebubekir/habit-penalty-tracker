'use client'

'use client'

import { FcGoogle } from 'react-icons/fc'
import { Button } from 'rizzui'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/core/context/auth-context'

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { signInWithGoogle } = useAuth()

  async function handleGoogleLogin() {
    setIsLoading(true)
    try {
      await signInWithGoogle()
      toast.success('Successfully logged in!')
      router.push('/') // Redirect to dashboard after login
    } catch (error) {
      toast.error('Failed to login. Please try again.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full items-center justify-center flex py-4 px-6"
      size="lg"
      onClick={handleGoogleLogin}
      disabled={isLoading}
    >
      <FcGoogle className="mr-2 h-5 w-5" />
      {isLoading ? 'Signing in...' : 'Continue with Google'}
    </Button>
  )
}
