import type { Block } from 'payload'

export const FeedBlock: Block = {
  slug: 'feedBlock',
  interfaceName: 'FeedBlock',
  fields: [
    {
      name: 'limit',
      type: 'number',
      defaultValue: 10,
      label: 'Limit',
    },
  ],
  labels: {
    plural: 'Feeds',
    singular: 'Feed',
  },
}
