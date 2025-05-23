import type { Block, Field } from 'payload'

const name: Field = {
  name: 'name',
  type: 'text',
  label: 'Name (lowercase, no special characters)',
  required: true,
}

const label: Field = {
  name: 'label',
  type: 'text',
  label: 'Label',
  localized: true,
}

const required: Field = {
  name: 'required',
  type: 'checkbox',
  label: 'Required',
}

const width: Field = {
  name: 'width',
  type: 'number',
  label: 'Field Width (percentage)',
}

const placeholder: Field = {
  name: 'placeholder',
  type: 'text',
  label: 'Placeholder',
}

export const DatePicker: Block = {
  slug: 'datePicker',
  labels: {
    singular: 'Date Picker',
    plural: 'Date Pickers',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'defaultValue',
          type: 'text',
          admin: {
            width: '50%',
          },
          label: 'Default Value',
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...placeholder,
          defaultValue: 'Select a date',
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...required,
          admin: {
            width: '50%',
          },
        },
        {
          name: 'range',
          type: 'checkbox',
          admin: {
            width: '50%',
          },
          label: 'Range',
          localized: true,
          defaultValue: false,
        },
      ],
    },
  ],
}

export const DraggableList: Block = {
  slug: 'draggableList',
  labels: {
    singular: 'Draggable List',
    plural: 'Draggable Lists',
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          ...name,
          admin: {
            width: '50%',
          },
        },
        {
          ...label,
          admin: {
            width: '50%',
          },
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...width,
          admin: {
            width: '100%',
          },
        },
      ],
    },
    {
      type: 'array',
      name: 'items',
      label: 'Items',
      fields: [
        {
          name: 'label',
          type: 'text',
          label: 'Label',
          localized: true,
        },
        {
          name: 'value',
          type: 'text',
          label: 'Value',
          localized: true,
        },
      ],
    },
    {
      type: 'row',
      fields: [
        {
          ...required,
          admin: {
            width: '100%',
          },
        },
      ],
    },
  ],
}
