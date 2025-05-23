'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Form } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import { z } from 'zod'
import { useMutation } from '@tanstack/react-query'
import { useAuth } from '@/providers/Auth'
import { Post } from '@/payload-types'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

const questionAndAnswerDtoSchema = z.object({
  question: z.string(),
  answer: z.string(),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generatePostDtoSchema = z.object({
  qa_list: z.array(questionAndAnswerDtoSchema),
  prompt: z.string(),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const createPostDtoSchema = z.object({
  title: z.string(),
  content: z.unknown(),
  meta: z.object({
    title: z.string(),
    description: z.string(),
  }),
  publishedAt: z.string(),
  authors: z.array(z.unknown()),
  _status: z.enum(['draft', 'published']),
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const postEntitySchema = z.object({
  title: z.string(),
  description: z.string(),
  content: z.string(),
})

type QuestionAndAnswerDto = z.infer<typeof questionAndAnswerDtoSchema>
type GeneratePostDto = z.infer<typeof generatePostDtoSchema>
type CreatePostDto = z.infer<typeof createPostDtoSchema>
type PostEntity = z.infer<typeof postEntitySchema>

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const { user } = useAuth()

  const formMethods = useForm({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    defaultValues: formFromProps.fields as any,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  // const onSubmit = useCallback(
  //   (data: FormFieldBlock[]) => {
  //     let loadingTimerID: ReturnType<typeof setTimeout>
  //     const submitForm = async () => {
  //       setError(undefined)

  //       const dataToSend = Object.entries(data).map(([name, value]) => ({
  //         field: name,
  //         value,
  //       }))

  //       // delay loading indicator by 1s
  //       loadingTimerID = setTimeout(() => {
  //         setIsLoading(true)
  //       }, 1000)

  //       try {
  //         const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
  //           body: JSON.stringify({
  //             form: formID,
  //             submissionData: dataToSend,
  //           }),
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           method: 'POST',
  //         })

  //         const res = await req.json()

  //         clearTimeout(loadingTimerID)

  //         if (req.status >= 400) {
  //           setIsLoading(false)

  //           setError({
  //             message: res.errors?.[0]?.message || 'Internal Server Error',
  //             status: res.status,
  //           })

  //           return
  //         }

  //         setIsLoading(false)
  //         setHasSubmitted(true)

  //         if (confirmationType === 'redirect' && redirect) {
  //           const { url } = redirect

  //           const redirectUrl = url

  //           if (redirectUrl) router.push(redirectUrl)
  //         }
  //       } catch (err) {
  //         console.warn(err)
  //         setIsLoading(false)
  //         setError({
  //           message: 'Something went wrong.',
  //         })
  //       }
  //     }

  //     void submitForm()
  //   },
  //   [router, formID, redirect, confirmationType],
  // )

  const generatePostMutation = useMutation({
    mutationFn: async (dataToSend: GeneratePostDto): Promise<PostEntity> => {
      const response = await fetch('http://localhost:8000/generate-article', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error('Failed to generate post')

      const data = await response.json()
      return data
    },
  })

  const createPostMutation = useMutation({
    mutationFn: async (dataToSend: CreatePostDto): Promise<Post> => {
      const response = await fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      })

      if (!response.ok) throw new Error('Failed to create post')

      const data = await response.json()
      return data
    },
  })

  const onSubmit = useCallback(
    async (data: FormFieldBlock[]) => {
      try {
        setIsLoading(true)

        // @ts-expect-error - This is valid, but TypeScript doesn't know that fields is an array of FormFieldBlock
        const questionAndAnswers: QuestionAndAnswerDto[] = Object.entries(data).map(
          ([name, value]) => {
            // @ts-expect-error - TypeScript doesn't know that fields is an array of FormFieldBlock
            const questionLabel = formFromProps.fields.find((field) => field?.name === name)?.label
            return {
              question: questionLabel,
              answer: value,
            }
          },
        )

        // This is implicitly added to the question and answer list
        questionAndAnswers.push({
          question: 'What is your name?',
          answer: user?.name || 'Anonymous',
        })

        const dataToSend: GeneratePostDto = {
          qa_list: questionAndAnswers,
          // @ts-expect-error - TypeScript doesn't know prompt exists on formFromProps
          prompt: formFromProps.prompt,
        }

        const post = await generatePostMutation.mutateAsync(dataToSend)

        const createPostData: CreatePostDto = {
          title: post.title,
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: post.content,
                      type: 'text',
                      version: 1,
                    },
                  ],
                  direction: 'ltr',
                  format: '',
                  indent: 0,
                  type: 'paragraph',
                  version: 1,
                  textFormat: 0,
                  textStyle: '',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'root',
              version: 1,
            },
          },
          meta: {
            title: post.title,
            description: post.description,
          },
          publishedAt: new Date().toISOString(),
          _status: 'published',
          authors: [user],
        }

        await createPostMutation.mutateAsync(createPostData)

        setHasSubmitted(true)
        setIsLoading(false)

        if (confirmationType === 'redirect' && redirect?.url) {
          router.push(redirect.url)
        }
      } catch (error) {
        console.error(error)
        // @ts-expect-error - TypeScript doesn't know error is an object
        setError({ message: error?.message || 'Something went wrong.' })
        setIsLoading(false)
      }
    },
    [
      confirmationType,
      createPostMutation,
      formFromProps.fields,
      // @ts-expect-error - TypeScript doesn't know prompt exists on formFromProps
      formFromProps.prompt,
      generatePostMutation,
      redirect?.url,
      router,
      user,
    ],
  )

  return (
    <div className="container lg:max-w-[56rem]">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6">
        <Form {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </Form>
      </div>
    </div>
  )
}
