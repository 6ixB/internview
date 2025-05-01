import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form'
import { Textarea as TextAreaComponent } from '@/components/ui/textarea'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Textarea: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
    rows?: number
  } & { textareaDescription?: string }
> = ({
  name,
  defaultValue,
  errors,
  label,
  register,
  required,
  rows = 3,
  width,
  textareaDescription,
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
        <FormDescription>{textareaDescription}</FormDescription>
        <FormControl>
          <TextAreaComponent
            defaultValue={defaultValue}
            id={name}
            rows={rows}
            {...register(name, { required: required })}
          />
        </FormControl>
        {errors[name] && <Error />}
      </FormItem>
    </Width>
  )
}
