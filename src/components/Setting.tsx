import type React from 'react'
import { Modal, Switch } from 'antd'

import store from '@/store'
import './Setting.scss'

const App: React.FC = () => {
  const settings = store.settingStore(state => state)

  const handleOk = () => {
    settings.setShowSettingModal(false)
  }

  const handleCancel = () => {
    settings.setShowSettingModal(false)
  }

  return (
    <>
      <Modal className='setting-modal' title="设置" open={settings.showSettingModal} onOk={handleOk}
        onCancel={handleCancel} footer={[]}>
        <div className='flex flex-wrap mt-4' style={{ width: '100%' }}>
          <div className='mb-3' style={{ width: '40%' }}>
            <span className='mr-3'>用坐标轴辅助线</span>
            <Switch checked={settings.axesHelperEnabled} onChange={value => settings.setAxesHelperEnabled(value)} />
          </div>
          <div className='mb-3' style={{ width: '40%' }}>
            <span className='mr-3'>启用轨道控制器</span>
            <Switch checked={settings.orbitControlsEnabled} onChange={value => settings.setOrbitControlsEnabled(value)} />
          </div>
          <div className='mb-3' style={{ width: '40%' }}>
            <span className='mr-3'>启用网格辅助线</span>
            <Switch checked={settings.gridHelperEnabled} onChange={value => settings.setGridHelperEnabled(value)}/>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default App
