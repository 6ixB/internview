import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { FormControl, FormDescription, FormItem, FormLabel } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'

export const Text: React.FC<
  TextField & {
    errors: Partial<FieldErrorsImpl>
    register: UseFormRegister<FieldValues>
  } & { textDescription?: string }
> = ({ name, defaultValue, errors, label, register, required, width, textDescription }) => {
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
        <FormDescription>{textDescription}</FormDescription>
        <FormControl>
          <Input
            defaultValue={defaultValue}
            id={name}
            type="text"
            {...register(name, { required })}
          />
        </FormControl>
        {errors[name] && <Error />}
      </FormItem>
    </Width>
  )
}
