import type { FC } from 'react'
import { InputNumber, Space } from 'antd'

import store from '@/store'

interface RightProps {

}

const Right: FC<RightProps> = () => {
  const { currentSelectedMesh } = store.schemaStore(state => state)
  const { configVisible } = store.settingStore(state => state)

  const renderConfig = () => {
    if (currentSelectedMesh) {
      const { position } = currentSelectedMesh
      return (
        <div className='flex flex-col p-1'>
          <div>
            基本配置信息
          </div>
          <div className='flex mt-3'>
            <span className='mr-2 block w-16' style={{ color: '#888' }}>position: </span>
            <Space className='flex flex-nowrap'>
              {/* <InputNumber className='w-10' size="small"
                value={position.x} onChange={(value) => {}} controls={false}
               /> */}
              <span>
                {position.x}
              </span>
              <InputNumber className='w-10' size='small'
                value={position.y} onChange={(value) => {}} controls={false}
                />
              <InputNumber className='w-10' size="small"
                value={position.z} onChange={(value) => {}} controls={false}
             />
            </Space>
          </div>
          <div className='flex mt-3'>
            <span className='mr-2 block w-16' style={{ color: '#888' }}>rotation: </span>
            <Space className='flex flex-nowrap'>
              <InputNumber className='w-10'
                value={position.x} onChange={(value) => {}} controls={false} size="small"
               />
            </Space>
          </div>
          <div className='flex mt-3'>
            <span className='mr-2 block w-16' style={{ color: '#888' }}>scale: </span>
            <Space className='flex flex-nowrap'>
              <InputNumber className='w-10'
                value={position.x} onChange={(value) => {}} controls={false} size="small"
               />
            </Space>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='flex rounded-md' style={{ height: '100%', width: configVisible ? '250px' : '0', backgroundColor: 'rgba(224, 224, 224, 0.7)' }}>
      {renderConfig()}
    </div>
  )
}

export default Right
