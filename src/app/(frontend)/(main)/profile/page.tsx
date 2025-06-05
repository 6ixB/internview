import type { Metadata } from 'next/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  ActivityIcon,
  CakeIcon,
  FootprintsIcon,
  GraduationCapIcon,
  MailIcon,
  SettingsIcon,
  UniversityIcon,
} from 'lucide-react'
import { CareerJourney } from '@/components/CareerJourney'
import { Button } from '@/components/ui/button'

export default async function Page() {
  return (
    <main className="w-full flex justify-center my-6 overflow-scroll">
      <div className="container grid grid-cols-6 grid-rows-2 gap-6">
        <div className="h-fit col-span-2 p-6 grid grid-rows-2 border rounded-lg gap-10 relative">
          <Button className="size-10 absolute top-2 right-2" variant="ghost">
            <SettingsIcon className="size-4" />
          </Button>
          <div className="flex flex-col items-center justify-center gap-2">
            <Avatar className="size-20">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex flex-col items-center">
              <h1 className="text-lg font-semibold">John Doe</h1>
              <h2 className="text-sm text-gray-600 dark:text-gray-300">Project Manager</h2>
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-2">
              <CakeIcon className="size-4" />
              <span className="text-sm">February 21st, 2000</span>
              <span className="text-sm font-medium">(25 years old)</span>
            </div>
            <div className="flex items-center gap-2">
              <MailIcon className="size-4" />
              <span className="text-sm">john.doe@example.com</span>
            </div>
            <div className="flex items-center gap-2">
              <UniversityIcon className="size-4" />
              <span className="text-sm">Bina Nusantara University</span>
            </div>
            <div className="flex items-center gap-2">
              <GraduationCapIcon className="size-4" />
              <span className="text-sm">Binusian 2025 of Computer Science</span>
            </div>
          </div>
        </div>
        <div className="h-fit col-span-4 px-6 pt-6 pb-1 border rounded-lg">
          <div className="flex items-center gap-2">
            <FootprintsIcon className="size-4" />
            <h1 className="font-semibold">My Journey</h1>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
            Based on your skills and interests, we recommend the following career paths, these
            career paths are tailored to your profile and can help you achieve your goals. You can
            explore these paths and find the best fit for you.
          </p>
          <CareerJourney />
        </div>
        <div className="col-span-6 p-6">
          <div className="flex items-center gap-2">
            <ActivityIcon className="size-4" />
            <h1 className="font-semibold">Latest Activity</h1>
          </div>
        </div>
      </div>
    </main>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Internview Profile`,
  }
}
