import type { FC } from 'react'
import { Drawer, Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import store from '@/store'
import type { ShortcutKey } from '@/utils/shortcutKeyController/shortcutKeyManage'
import { editorShortcuts } from '@/utils/shortcutKeyController/shortcutKeyManage'
import './Help.scss'

interface HelpProps {

}

const columns: ColumnsType<ShortcutKey> = [
  {
    title: 'name',
    dataIndex: 'label',
    key: 'label',
    render: text => <a>{text}</a>,
  },
  {
    title: 'shortcuts',
    dataIndex: 'key',
    key: 'key',
  },
  {
    title: 'description',
    dataIndex: 'describe',
    key: 'describe',
  },
]

const Help: FC<HelpProps> = () => {
  const { showHelpDrawer, setShowHelpDrawer } = store.settingStore(state => ({
    showHelpDrawer: state.showHelpDrawer,
    setShowHelpDrawer: state.setShowHelpDrawer,
  }))

  return (
    <Drawer className='help' placement="right" onClose={() => setShowHelpDrawer(false)} open={showHelpDrawer}>
      <div>
        <h3 className='mb-3'>快捷键</h3>
        <Table columns={columns} dataSource={editorShortcuts} />
      </div>
    </Drawer>
  )
}

export default Help
