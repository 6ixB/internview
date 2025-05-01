'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import React, { Fragment } from 'react'

import type { Post, User } from '@/payload-types'

import { Media } from '@/components/Media'

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
  const { description, image: metaImage } = meta || {}

  const hasCategories = categories && Array.isArray(categories) && categories.length > 0
  const titleToUse = titleFromProps || title
  const sanitizedDescription = description?.replace(/\s/g, ' ') // replace non-breaking space with white space
  const href = `/${relationTo}/${slug}`

  return (
    <Link href={href}>
      <Card className="border-none shadow-none max-w-2xl hover:bg-gray-100 hover:dark:bg-gray-900 cursor-pointer">
        <CardHeader>
          <CardTitle>
            {titleToUse && (
              <div className="prose">
                <h3>{titleToUse}</h3>
              </div>
            )}
          </CardTitle>
          <CardDescription>
            {description && (
              <div className="mt-2">{description && <p>{sanitizedDescription}</p>}</div>
            )}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          {metaImage && typeof metaImage !== 'string' && (
            <Media resource={metaImage} className="rounded-xl" />
          )}
          {showCategories && hasCategories && (
            <div className="uppercase text-sm mb-4">
              {showCategories && hasCategories && (
                <div>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object') {
                      const { title: titleFromCategory } = category

                      const categoryTitle = titleFromCategory || 'Untitled category'

                      const isLast = index === categories.length - 1

                      return (
                        <Fragment key={index}>
                          {categoryTitle}
                          {!isLast && <Fragment>, &nbsp;</Fragment>}
                        </Fragment>
                      )
                    }

                    return null
                  })}
                </div>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <CardDescription>
            By&nbsp;
            {authors
              ?.map((author: User | number) =>
                typeof author === 'number' ? 'Unknown' : author.name,
              )
              .join(', ')}
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
