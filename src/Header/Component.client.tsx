'use client'

import Link from 'next/link'
import React, { useState } from 'react'
import type { Header } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { useAuth } from '@/providers/Auth'
import { CircleUserRoundIcon, SearchIcon, SquarePenIcon, XIcon } from 'lucide-react'
import { UserNav } from './UserNav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {
  const [query, setQuery] = useState('')
  const { user } = useAuth()
  const navItems = data?.navItems || []

  return (
    <header className="w-full sticky top-0 z-20 bg-background border-b border-gray-200 dark:border-gray-800">
      <div className="container py-2 md:px-12 lg:px-8 grid grid-cols-3">
        <nav className="flex gap-3 justify-start items-center select-none min-w-2xl">
          <Link href="/" className="flex items-center gap-3 mr-6">
            <Logo loading="eager" priority="high" className="invert-0 dark:invert" />
            <h1 className="hidden md:block text-xl font-semibold">Internview</h1>
          </Link>
          {navItems.map(({ link }, i) => {
            return <CMSLink key={i} {...link} appearance="link" />
          })}
        </nav>
        <div className="flex justify-center items-center ">
          <div className="hidden lg:block relative w-full max-w-lg">
            <SearchIcon className="absolute top-2.5 left-3.5 h-4 w-4 text-muted-foreground" />
            <Input
              name="search"
              onChange={(e) => {
                setQuery(e.target.value)
              }}
              value={query}
              placeholder="Search Internview"
              className="w-full px-10 rounded-full bg-gray-100 dark:bg-gray-800 outline-none border-none ring-0"
            />
            {query && (
              <XIcon
                className="absolute top-2.5 right-2.5 h-4 w-4 cursor-pointer text-muted-foreground"
                onClick={() => {
                  setQuery('')
                }}
              />
            )}
            <span className="sr-only">Search</span>
          </div>
        </div>
        <nav className="flex gap-2 justify-end items-center min-w-2xl">
          {user ? (
            <>
              <Link href="/create-post">
                <Button variant="ghost">
                  <SquarePenIcon className="size-4 text-primary" />
                  <span>Share your story</span>
                </Button>
              </Link>
              <UserNav user={user} />
            </>
          ) : (
            <Link href="/login">
              <Button variant="outline" className="rounded-full">
                <CircleUserRoundIcon />
                Login
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
