'use client'

import { useCallback } from 'react'
import { cn } from '@/utilities/ui'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'
import { GalleryVerticalEnd } from 'lucide-react'
import Link from 'next/link'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const createUserDtoSchema = z.object({
  email: z.string().email({
    message: 'Email must be in valid format',
  }),
  name: z.string().min(1, {
    message: 'Name must be not empty',
  }),
  password: z.string().min(8, {
    message: 'Password must be at least 8 characters',
  }),
  confirmPassword: z.string().min(8, {
    message: 'Confirm password must be at least 8 characters',
  }),
})

type CreateUserDto = z.infer<typeof createUserDtoSchema>

export function SignupForm({ className, ...props }: React.ComponentPropsWithoutRef<'div'>) {
  const form = useForm<CreateUserDto>({
    resolver: zodResolver(createUserDtoSchema),
    defaultValues: {
      email: '',
      name: '',
      password: '',
      confirmPassword: '',
    },
  })

  const router = useRouter()

  const createUserMutation = useMutation({
    mutationFn: async (values: CreateUserDto) => {
      const { email, name, password } = values

      const response = await fetch('/api/users', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
      })

      const data = await response.json()
      return data
    },
    onSuccess: () => {
      router.push('/login')
    },
    onError: (error) => {
      form.setError('root', {
        type: 'manual',
        message: error.message,
      })
    },
  })

  const onSubmit = useCallback(async (values: CreateUserDto) => {
    const { password, confirmPassword } = values

    if (password !== confirmPassword) {
      form.setError('password', {
        message: 'Passwords do not match',
      })
      return
    }

    toast.promise(createUserMutation.mutateAsync(values), {
      loading: 'Creating your account...',
      success: 'Account created successfully',
      error: (error) => error.message,
    })
  }, [])

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2">
              <Link href="/" className="flex flex-col items-center gap-2 font-medium">
                <div className="flex h-8 w-8 items-center justify-center rounded-md">
                  <GalleryVerticalEnd className="size-6" />
                </div>
                <span className="sr-only">Internview</span>
              </Link>
              <h1 className="text-xl font-bold">Welcome to Internview</h1>
              <div className="text-center text-sm">
                Let's get started. Fill in the details below to create your account.
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="email" placeholder="john.doe@example.com" />
                    </FormControl>
                    <FormDescription>We need your email to send you a confirmation</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} autoComplete="name" placeholder="John Doe" />
                    </FormControl>
                    <FormDescription>This is your public display name</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>
                      Must be at least 8 characters long, contain a number, and a special character
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormDescription>Re-enter your password to confirm it</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root && (
                <FormMessage>{form.formState.errors.root.message}</FormMessage>
              )}
              <Button
                type="submit"
                className="w-full"
                disabled={createUserMutation.isPending || createUserMutation.isSuccess}
              >
                Signup
              </Button>
              <div className="text-center text-sm">
                Already have an account?&nbsp;
                <Link href="/login" className="underline underline-offset-4">
                  Log in now
                </Link>
              </div>
            </div>
            <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
              <span className="relative z-10 bg-background px-2 text-muted-foreground">or</span>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <Button variant="outline" className="w-full" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Continue with Apple
              </Button>
              <Button variant="outline" className="w-full" disabled>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                Continue with Google
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>&nbsp; and{' '}
        <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
