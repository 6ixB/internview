import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Button } from '@/components/ui/button'
import { GripVerticalIcon } from 'lucide-react'

export type SortableItemProps = {
  position: number
  label: string
  value: string
}

export function SortableItem({ position, label, value }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: value })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="ps-3 py-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-sm flex items-center justify-between"
    >
      <div className="flex items-center gap-3">
        <span className="font-semibold size-6 flex items-center justify-center rounded-full bg-background text-xs">
          {position}
        </span>
        <span className="font-semibold">{label}</span>
      </div>
      <Button
        {...listeners}
        {...attributes}
        variant="ghost"
        type="button"
        className="bg-transparent hover:bg-transparent"
      >
        <GripVerticalIcon className="size-4" />
      </Button>
    </div>
  )
}
