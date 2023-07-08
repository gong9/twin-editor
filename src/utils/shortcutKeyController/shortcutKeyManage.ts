export interface ShortcutKey {
  name: string
  key: string
  label?: string
  describe?: string
}
export const editorShortcuts: ShortcutKey[] = [
  {
    name: 'save',
    key: 'command+s',
    label: 'Save',
    describe: 'Save the current file',
  },
]
