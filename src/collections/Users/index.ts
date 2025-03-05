import type { CollectionConfig } from 'payload'

import adminsAndUser from '@/access/adminsAndUsers'
import { admins } from '@/access/admins'
import { anyone } from '@/access/anyone'
import { checkRole } from '@/access/checkRole'

import { protectRoles } from './hooks/protectRoles'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    admin: ({ req: { user } }) => checkRole(['admin'], user ? user : undefined),
    create: anyone,
    delete: admins,
    read: adminsAndUser,
    update: adminsAndUser,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      required: true,
      name: 'name',
      type: 'text',
    },
    {
      required: true,
      name: 'roles',
      type: 'select',
      hasMany: true,
      saveToJWT: true,
      hooks: {
        beforeChange: [protectRoles],
      },
      options: [
        {
          label: 'Admin',
          value: 'admin',
        },
        {
          label: 'User',
          value: 'user',
        },
      ],
    },
  ],
  timestamps: true,
}
