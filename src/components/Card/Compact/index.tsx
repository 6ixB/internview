'use client'

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import React from 'react'

import type { Post, User } from '@/payload-types'

import { Badge } from '@/components/ui/badge'

export type CardPostData = Pick<
  Post,
  'slug' | 'categories' | 'meta' | 'title' | 'authors' | 'publishedAt'
>

export const CompactCard: React.FC<{
  alignItems?: 'center'
  doc?: CardPostData
  relationTo?: 'posts'
  showCategories?: boolean
  title?: string
}> = (props) => {
  const { doc, relationTo, showCategories, title: titleFromProps } = props

  const { slug, categories, meta, title, authors, publishedAt } = doc || {}
  const { description } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <Link href={href}>
      <Card className="border-none shadow-none max-w-2xl hover:bg-gray-50 hover:dark:bg-gray-950 cursor-pointer rounded-none">
        <CardHeader>
          <CardTitle>
            {titleToUse && (
              <div className="prose">
                <h3>{titleToUse}</h3>
              </div>
            )}
          </CardTitle>
          {showCategories && hasCategories && (
            <div className="flex flex-wrap gap-1">
              {categories?.map((category, index) => {
                if (typeof category === 'object') {
                  const { title: titleFromCategory } = category
                  const categoryTitle = titleFromCategory || 'Untitled category'

                  return <Badge key={index}>{categoryTitle}</Badge>
                }

                return null
              })}
            </div>
          )}
          <CardDescription>
            {description && (
              <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
            )}
          </CardDescription>
        </CardHeader>
        <CardFooter className="flex justify-between items-center">
          <CardDescription>
            By&nbsp;
            {authors && authors.length > 0
              ? authors
                  .map((author: User | number) =>
                    typeof author === 'number' ? 'Anonymous' : author.name,
                  )
                  .join(', ')
              : 'Anonymous'}
          </CardDescription>
          <CardDescription>
            {publishedAt
              ? new Date(publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : 'Unknown'}
          </CardDescription>
        </CardFooter>
      </Card>
    </Link>
  )
}
