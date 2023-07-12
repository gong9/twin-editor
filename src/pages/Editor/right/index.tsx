import type { FC } from 'react'
import ConfigurationForm from './configurationFrom'

import store from '@/store'

interface RightProps {

}

const Right: FC<RightProps> = () => {
  const { currentSelectedMesh } = store.schemaStore(state => state)
  const { configVisible } = store.settingStore(state => state)

  const renderConfig = () => {
    if (currentSelectedMesh) {
      return (
        <div className='flex flex-col p-1'>
          <ConfigurationForm currentCubeSchema={currentSelectedMesh}/>
        </div>
      )
    }
  }

  return (
    <div className='flex rounded-md' style={{ height: '100%', width: configVisible ? '400px' : '0', backgroundColor: '#252526', color: '#ccc' }}>
      {renderConfig()}
    </div>
  )
}

export default Right
