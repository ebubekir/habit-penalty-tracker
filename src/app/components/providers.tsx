import { ReactQueryProvider } from './react-query'
import { AuthProvider } from '@/core/context/auth-context'
import { Toaster } from 'react-hot-toast'

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ReactQueryProvider>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </ReactQueryProvider>
  )
}
