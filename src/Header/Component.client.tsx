'use client'

import Link from 'next/link'
import React from 'react'
import type { Header } from '@/payload-types'
import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import { useAuth } from '@/providers/Auth'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const { user } = useAuth()

  return (
    <header className="w-full sticky top-0 z-20 bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="container py-3 flex justify-between">
        <Link href="/" className="flex items-center gap-3">
          <Logo loading="eager" priority="high" className="invert-0 dark:invert" />
          <h1 className="text-xl font-semibold">Internview</h1>
        </Link>
        <HeaderNav data={data} user={user} />
      </div>
    </header>
  )
}
