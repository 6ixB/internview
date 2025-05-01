import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { User } from '@/payload-types'
import { useAuth } from '@/providers/Auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useCallback } from 'react'
import { toast } from 'sonner'

export const UserNav: React.FC<{ user: User }> = ({ user }) => {
  const { setAuthState } = useAuth()

  const fallbackName = `${user.name
    .split(' ')
    .map((word) => word[0])
    .join('')}`

  const router = useRouter()

  const logoutUserMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch('/api/users/logout', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      const data = await response.json()
      return data
    },
    onSuccess: (data) => {
      if (data.errors) {
        for (const error of data.errors) {
          throw new Error(error.message)
        }
      }

      setAuthState({ user: null })
      router.push('/')
    },
  })

  const handleLogout = useCallback(async () => {
    toast.promise(logoutUserMutation.mutateAsync(), {
      loading: 'Logging out of your account...',
      success: 'Logout successful',
      error: (error) => error.message,
    })
  }, [logoutUserMutation])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="ms-2 relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8 ring-2 ring-cyan-700">
            <AvatarImage src="" alt={user.name} />
            <AvatarFallback className="text-xs">{fallbackName}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
