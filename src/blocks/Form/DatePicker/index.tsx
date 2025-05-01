import { Control, FieldErrorsImpl } from 'react-hook-form'
import { DatePickerField } from './type'

import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { cn } from '@/utilities/ui'
import { Button } from '@/components/ui/button'
import { CalendarIcon } from 'lucide-react'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const DatePicker: React.FC<
  DatePickerField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  } & { datePickerDescription?: string }
> = ({ name, control, errors, label, required, width, datePickerDescription }) => {
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
        <FormDescription>{datePickerDescription}</FormDescription>
        <FormControl>
          <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field }) => {
              return (
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={'outline'}
                        className={cn(
                          'w-full pl-3 text-left font-normal',
                          !field.value && 'text-muted-foreground',
                        )}
                      >
                        {field.value ? format(field.value, 'PPP') : <span>Pick a date</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )
            }}
            rules={{ required }}
          />
        </FormControl>
        {errors[name] && <Error />}
      </FormItem>
    </Width>
  )
}
