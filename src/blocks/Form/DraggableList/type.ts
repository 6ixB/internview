interface DragListFieldItem {
  label: string
  value: string
}

export interface DragListField {
  blockName?: string
  blockType: 'datePicker'
  defaultValue?: string
  label?: string
  name: string
  required?: boolean
  width?: number
  items: DragListFieldItem[]
}
