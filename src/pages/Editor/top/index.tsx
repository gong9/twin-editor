import type { FC } from 'react'
import { useMemo } from 'react'
import {
  CloseOutlined,
  DownloadOutlined,
  QuestionCircleOutlined,
  RedoOutlined,
  SaveOutlined,
  SettingOutlined,
  UndoOutlined,
  UploadOutlined,
} from '@ant-design/icons'
import { Menu, message } from 'antd'
import type { MenuProps } from 'antd'

import store from '@/store'
import { shortAction } from '@/pages/Editor/controller'

interface TopProps {

}

enum TopItemEnum {
  operate,
  setting,
}

const Top: FC<TopProps> = () => {
  const schemaStore = store.schemaStore(state => state)
  const settingStore = store.settingStore(state => state)

  const operateData = useMemo<MenuProps['items']>(
    () => [
      {
        label: '导入',
        key: 'import',
        icon: <UploadOutlined />,
        onClick: () => {
          message.warning('开发中')
        },
      },
      {
        label: '导出',
        key: 'export',
        icon: <DownloadOutlined />,
        onClick: () => {
          message.warning('开发中')
        },
      },
      {
        label: '回退',
        key: 'undo',
        icon: <UndoOutlined />,
        onClick: () => {
          shortAction.undo()
        },
      },
      {
        label: '撤销',
        key: 'redo',
        icon: <RedoOutlined />,
        onClick: () => {
          shortAction.undo()
        },
      },
      {
        label: '清空',
        key: 'clear',
        icon: <CloseOutlined />,
        onClick: () => {
          schemaStore.reset()
          message.success('清空成功')
        },
      },
      {
        label: '保存',
        icon: <SaveOutlined />,
        key: 'save',
        onClick: () => {
          shortAction.save()
        },
      },
    ], [
      schemaStore,
    ],
  )
  const settingData = useMemo<MenuProps['items']>(
    () => [
      {
        label: '设置',
        key: 'setting',
        icon: <SettingOutlined />,
        onClick: () => {
          settingStore.setShowSettingModal(true)
        },
      },
      {
        label: '帮助',
        key: 'help',
        icon: <QuestionCircleOutlined />,
        onClick: () => {
          settingStore.setShowHelpDrawer(true)
        },
      },
    ],
    [
      schemaStore,
    ],
  )

  const renderTopItem = (type: TopItemEnum) => {
    const currentData = type === TopItemEnum.operate ? operateData : settingData
    return (<Menu mode="horizontal" items={currentData} selectable={false} style={{ backgroundColor: '#3c3c3c', color: '#ccc' }}/>)
  }

  return (
    <div className='flex justify-between pt-1 items-center cursor-pointer' style={{ backgroundColor: '#3c3c3c', height: '60px', color: '#ccc' }}>
      <div className='ml-5'>孪生编辑器</div>
      <div className='flex'>
        {renderTopItem(TopItemEnum.operate)}
      </div>
      <div className='flex'>
        {renderTopItem(TopItemEnum.setting)}
      </div>
    </div>
  )
}

export default Top
