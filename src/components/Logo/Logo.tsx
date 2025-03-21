import clsx from 'clsx'
import Image from 'next/image'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
}

export const Logo = (props: Props) => {
  const { loading: loadingFromProps, priority: priorityFromProps, className } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    <Image
      alt="Internview Logo"
      width={25}
      height={15}
      loading={loading}
      fetchPriority={priority}
      decoding="async"
      className={clsx('max-w-[25px] w-full h-[15px]', className)}
      src="/internview.svg"
    />
  )
}
