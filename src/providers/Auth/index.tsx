'use client'

import { User } from '@/payload-types'
import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { produce } from 'immer'
import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'

export interface AuthState {
  user: User | null

  collection?: string
  strategy?: string
  exp?: number
  token?: string
  message: string

  setUser: (value: ((draft: User | null) => User | null | void) | User | null) => void

  setAuthState: (data: {
    user: User | null
    collection?: string
    strategy?: string
    exp?: number
    token?: string
  }) => void
}

export const useAuth = create<AuthState>()(
  immer((set) => ({
    user: null,
    message: 'Account',

    setUser: (value) =>
      set((state) => {
        if (typeof value === 'function') {
          state.user = produce(state.user, value as (draft: User | null) => User | null)
        } else {
          state.user = value
        }
      }),

    setAuthState: (data) =>
      set((state) => {
        state.user = data.user
        state.collection = data.collection
        state.strategy = data.strategy
        state.exp = data.exp
        state.token = data.token
      }),
  })),
)

export const AuthProvider = ({ children }: React.PropsWithChildren) => {
  const { setAuthState } = useAuth()

  const { isError, data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await fetch('/api/users/me', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) throw new Error('Failed to fetch user')

      const data = await response.json()
      return data
    },
  })

  useEffect(() => {
    if (data) {
      const { user, ...metadata } = data
      setAuthState({ user, ...metadata })
    } else if (isError) {
      setAuthState({ user: null })
    }
  }, [data, isError, setAuthState])

  return <>{children}</>
}
