'use client'

import { Title } from 'rizzui'
import { LoginForm } from '@/app/auth/components/login-form'

// export const metadata: Metadata = {
//   title: "Login",
//   description: "Login to access your account",
// }

export default function AuthPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-[400px] rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-8 text-center">
          <Title as="h1" className="mb-2">
            Welcome Back
          </Title>
          <p className="text-gray-500">Sign in to continue to your account</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
