import React from 'react'

import { CompactCard, CardPostData } from '@/components/Card/Compact'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers as getHeaders } from 'next/headers'
import Link from 'next/link'
import { MegaphoneIcon, UserRoundCogIcon, UserRoundPlusIcon } from 'lucide-react'
import { Separator } from '../ui/separator'

export type Props = {
  posts: CardPostData[]
}

export const Feed: React.FC<Props> = async (props) => {
  const payload = await getPayload({ config: configPromise })
  const headers = await getHeaders()
  const auth = await payload.auth({ headers })

  const { posts } = props

  return (
    <div className="container flex justify-center h-dvh">
      <div className="flex-1 flex flex-col items-center md:border-x divide-y border-border max-w-fit">
        {posts?.map((result, index) => {
          if (typeof result === 'object' && result !== null) {
            return (
              <div key={index} className="w-full">
                <CompactCard doc={result} relationTo="posts" showCategories />
                {index === posts.length - 1 && <Separator />}
              </div>
            )
          }

          return null
        })}
      </div>
      <div className="hidden lg:flex flex-col items-center max-w-xs p-6">
        <div className="sticky top-20">
          <div className="w-full">
            <p className="text-sm font-semibold">
              Stay updated with our latest posts and articles.
            </p>
            <div className="w-full mt-2 mb-4">
              <h2 className="scroll-m-20 border-b pb-2 text-lg font-semibold tracking-tight">
                Frequently Asked Questions
              </h2>
              <Accordion type="multiple">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="hover:no-underline">
                    ❓ What is this app about?
                  </AccordionTrigger>
                  <AccordionContent>
                    This app helps companies, recruiters, and individuals document and share
                    insights about the interview process and gather information about different
                    interview experience and preparation tips.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="hover:no-underline">
                    🧾 How does it work?
                  </AccordionTrigger>
                  <AccordionContent>
                    Users can submit their interview experiences and tips through a form. The app
                    then generates an article based on the submitted data.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="hover:no-underline">
                    🔒 Is my data private?
                  </AccordionTrigger>
                  <AccordionContent>
                    All form responses are kept private unless you choose to make the resulting
                    article public.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
          {!auth.user && (
            <Link href="/signup" className="text-sm">
              <Button variant="ghost">
                <UserRoundPlusIcon className="size-4" /> Create account
              </Button>
            </Link>
          )}
          <div className="mt-2 flex justify-between items-center">
            {auth.user?.roles?.includes('admin') ? (
              <Link href="/admin" className="text-sm">
                <Button variant="ghost">
                  <UserRoundCogIcon className="size-4" /> Admin
                </Button>
              </Link>
            ) : (
              <Link href="/feedback" className="text-sm">
                <Button variant="ghost">
                  <MegaphoneIcon className="size-4" /> Give feedback
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
