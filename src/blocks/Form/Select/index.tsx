import type { SelectField } from '@payloadcms/plugin-form-builder/types'
import type { Control, FieldErrorsImpl } from 'react-hook-form'

import {
  Select as SelectComponent,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form'
import React from 'react'
import { Controller } from 'react-hook-form'

import { Error } from '../Error'
import { Width } from '../Width'

export const Select: React.FC<
  SelectField & {
    control: Control
    errors: Partial<FieldErrorsImpl>
  } & { selectDescription?: string }
> = ({
  name,
  control,
  errors,
  label,
  options,
  required,
  width,
  selectDescription,
  placeholder,
}) => {
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
        <FormDescription>{selectDescription}</FormDescription>
        <FormControl>
          <Controller
            control={control}
            defaultValue=""
            name={name}
            render={({ field: { onChange, value } }) => {
              const controlledValue = options.find((t) => t.value === value)

              return (
                <SelectComponent
                  onValueChange={(val) => onChange(val)}
                  value={controlledValue?.value}
                >
                  <SelectTrigger className="w-full" id={name}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map(({ label, value }) => {
                      return (
                        <SelectItem key={value} value={value}>
                          {label}
                        </SelectItem>
                      )
                    })}
                  </SelectContent>
                </SelectComponent>
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
