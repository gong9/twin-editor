import type { FC } from 'react'

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
        <div className='flex flex-col p-4'>
          坐标信息： {position.x}-{position.y}-{position.z}
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
