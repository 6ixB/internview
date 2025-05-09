import type { Post, FeedBlock as FeedBlockProps } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'

import { Feed } from '@/components/Feed'

export const FeedBlock: React.FC<
  FeedBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, limit: limitFromProps } = props

  const limit = limitFromProps || 3

  let posts: Post[] = []

  const payload = await getPayload({ config: configPromise })

  const fetchedPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit,
  })

  posts = fetchedPosts.docs

  return (
    <div id={`block-${id}`}>
      <Feed posts={posts} />
    </div>
  )
}
