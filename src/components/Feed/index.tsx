import { cn } from '@/utilities/ui'
import React from 'react'

import { CompactCard, CardPostData } from '@/components/Card/Compact'
import { Separator } from '@/components/ui/separator'

export type Props = {
  posts: CardPostData[]
}

export const Feed: React.FC<Props> = (props) => {
  const { posts } = props

  return (
    <div className={cn('container')}>
      <div>
        <div className="flex flex-col items-center gap-1">
          {posts?.map((result, index) => {
            if (typeof result === 'object' && result !== null) {
              return (
                <div key={index}>
                  <CompactCard doc={result} relationTo="posts" showCategories />
                  {index !== posts.length - 1 && <Separator className="max-w-2xl mt-1" />}
                </div>
              )
            }

            return null
          })}
        </div>
      </div>
    </div>
  )
}
