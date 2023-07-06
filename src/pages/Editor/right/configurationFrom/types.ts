export interface FormSchema {
  type: string
  label: string
  value: string
  onchange: (value: string) => void
}
