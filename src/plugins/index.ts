import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Block, Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'

import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'
import { DatePicker, DraggableList } from '@/blocks/Form/block'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Internview` : 'Internview'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
      datePicker: DatePicker,
      draggableList: DraggableList,
    },
    formOverrides: {
      // @ts-expect-error - This is a valid override, mapped fields do resolve to the same type
      fields: ({ defaultFields }) => {
        const originalFields = defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          // Adds a description field to each block in the form builder
          else if ('name' in field && field.name === 'fields') {
            return {
              ...field,
              blocks:
                'blocks' in field &&
                field.blocks.map((block: Block) => ({
                  ...block,
                  fields: [
                    ...block.fields.slice(0, -1), // Everything except the required field (last item)
                    {
                      type: 'row',
                      fields: [
                        {
                          name: `${block.slug}Description`,
                          type: 'text',
                          label: 'Description',
                        },
                      ],
                    },
                    block.fields[block.fields.length - 1], // Insert the required field back in
                  ],
                })),
            }
          }

          return field
        })

        return [
          ...originalFields.slice(0, 1),
          {
            name: 'prompt',
            label:
              'Prompt (Please provide details on how to generate the article based on the form submission)',
            type: 'textarea',
            defaultValue: 'Please write a detailed article about your interview experience.',
            required: true,
          },
          ...originalFields.slice(1, originalFields.length),
        ]
      },
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
]
