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
    label: '保存',
    describe: 'Save the current file',
  },
  {
    name: 'delete',
    key: 'backspace, delete',
    label: '删除',
    describe: '选中物体后，backspace删除',
  },
]
