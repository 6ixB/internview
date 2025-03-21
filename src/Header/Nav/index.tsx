'use client'

import React from 'react'
import type { Header as HeaderType, User } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { UserNav } from '../UserNav'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogInIcon } from 'lucide-react'

export const HeaderNav: React.FC<{ data: HeaderType; user: User | null }> = ({ data, user }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex gap-3 items-center">
      {navItems.map(({ link }, i) => {
        return <CMSLink key={i} {...link} appearance="link" />
      })}
      {user ? (
        <UserNav user={user} />
      ) : (
        <Link href="/login">
          <Button variant="link" className="p-0 ms-4">
            <LogInIcon />
            Login
          </Button>
        </Link>
      )}
    </nav>
  )
}
