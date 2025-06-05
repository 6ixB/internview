import { Control, FieldErrorsImpl } from 'react-hook-form'
import { DragListField } from './type'

import React, { useMemo, useState } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'

import { SortableItem } from './SortableItem'

import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const DraggableList: React.FC<
  DragListField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  } & { draggableListDescription?: string }
> = ({
  name,
  control,
  errors,
  label,
  required,
  width,
  draggableListDescription,
  items: itemSet,
}) => {
  const [items, setItems] = useState(itemSet)
  const itemValues = useMemo(() => items.map((item) => item.value), [items])
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  // function handleDragEnd(event: DragEndEvent) {
  //   const { active, over } = event

  //   if (!active || !over) {
  //     return
  //   }

  //   if (active.id !== over.id) {
  
  //       const oldIndex = items.findIndex((item) => item.value === active.id)
  //       const newIndex = items.findIndex((item) => item.value === over.id)

  //       const newItems = arrayMove(items, oldIndex, newIndex)
  //       setItems(newItems)

  //       const newOrder = newItems.map((item: { value: any })=>item.value)
  //       field.onChange(newOrder)
  //   }
  // }

  return (
    <Width width={width}>
      <FormItem>
        <FormLabel htmlFor={name}>
          {label}
          {required && (
            <span className="required text-red-500">
              &nbsp;*&nbsp;<span className="sr-only">(required)</span>
            </span>
          )}
        </FormLabel>
        <FormDescription>{draggableListDescription}</FormDescription>
        <FormControl>
          <Controller
            control={control}
            defaultValue={itemValues}
            name={name}
            rules={{ required }}
            render={({ field } : { field: { value: string[]; onChange: (val: string[]) => void } }) => {

              const handleDragEnd = (event: DragEndEvent) => {
                const { active, over } = event
                if (!active || !over || active.id === over.id) return

                const oldIndex = items.findIndex((item) => item.value === active.id)
                const newIndex = items.findIndex((item) => item.value === over.id)

                const newItems = arrayMove(items, oldIndex, newIndex)
                setItems(newItems)

                // Send updated order to form field
                const newOrder = newItems.map((item: { value: any }) => item.value)
                field.onChange(newOrder)
              }

              return (
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext items={itemValues} strategy={verticalListSortingStrategy}>
                    {items.map((item, index) => (
                      <SortableItem
                        key={item.value}
                        position={index + 1}
                        label={item.label}
                        value={item.value}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )
            }}
          />
        </FormControl>
        {errors[name] && <Error />}
      </FormItem>
    </Width>
  )
}
