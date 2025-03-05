import { headers as getHeaders } from 'next/headers.js'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Metadata } from 'next/types'

import { LoginForm } from '@/components/Auth/LoginForm'

export default async function LoginPage() {
  const headers = await getHeaders()
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers })

  if (user) {
    redirect('/')
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm />
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Login`,
  }
}
