import type { FC } from 'react'
import { Vector3 } from 'three'

import { emitter } from '@/utils'
import store from '@/store'
import './index.scss'

interface MiniMenuProps {
  className?: string
}

interface MiniMenuDataItem {
  name: string
  icon: string
  onClick?: () => void
}

const MiniMenu: FC<MiniMenuProps> = ({ className }) => {
  const { setTransformControlsMode, transformControlsMode, configVisible, setConfigVisible } = store.settingStore(state => (
    {
      setTransformControlsMode: state.setTransformControlsMode,
      transformControlsMode: state.transformControlsMode,
      configVisible: state.configVisible,
      setConfigVisible: state.setConfigVisible,
    }
  ))
  const { currentSelectedMesh, setCurrentSelectedMesh } = store.schemaStore(state => (
    {
      currentSelectedMesh: state.currentSelectedMesh,
      setCurrentSelectedMesh: state.setCurrentSelectedMesh,
    }
  ))
  const { currentScene, currentMainCamera, currentControls } = store.threeStore(state => state)

  const toggle2dView = () => {
    if (currentScene && currentMainCamera && currentControls) {
      currentControls.object.lookAt(new Vector3(0, 0, 0))
      currentControls.object.position.copy(new Vector3(0, 20, 0))
      currentControls.maxAzimuthAngle = 0
      currentControls.minAzimuthAngle = 0
      currentControls.maxPolarAngle = 0
      currentControls.minPolarAngle = 0
      currentControls.update()
    }
  }

  const miniMenuData: MiniMenuDataItem[] = [
    {
      name: 'arrow',
      icon: 'icon-shubiaojiantou',
      onClick: () => {
        setCurrentSelectedMesh(null)
      },
    },
    {
      name: 'translate',
      icon: 'icon-yidong',
      onClick: () => {
        setTransformControlsMode('translate')
      },
    },
    {
      name: 'scale',
      icon: 'icon-suofang',
      onClick: () => {
        setTransformControlsMode('scale')
      },
    },
    {
      name: 'rotate',
      icon: 'icon-xuanzhuan',
      onClick: () => {
        setTransformControlsMode('rotate')
      },
    },
    {
      name: '2d-view',
      icon: 'icon-view_d',
      onClick: () => {
        toggle2dView()
      },
    },
    {
      name: 'reset',
      icon: 'icon-zhongzhi',
      onClick: () => {
        emitter.emit('resetState')
      },
    },
  ]

  const renderMiiMenuList = () => {
    return miniMenuData.map((item) => {
      return (
        <div onClick={item.onClick && item.onClick} key={item.name} className='w-8 h-8 flex justify-center items-center rounded mb-2 cursor-pointer' style={{ backgroundColor: '#000', opacity: '0.8', color: currentSelectedMesh && transformControlsMode === item.name ? 'yellow' : '#fff' }}>
          <span className={`iconfont ${item.icon}`} style={{ fontSize: '15px' }}></span>
        </div>
      )
    })
  }

  return (
    <div className={`${className} mini-menu`}>
      {renderMiiMenuList()}

      <div onClick={() => { setConfigVisible(!configVisible) }} className='config-show-control w-6 h-8 flex justify-center items-center rounded mb-2 cursor-pointer' style={{ backgroundColor: '#000' }}>
        <span className={`iconfont ${configVisible ? 'icon-xiangyoujiantou' : 'icon-xiangzuojiantou'}`} style={{ fontSize: '15px' }}></span>
      </div>
    </div>
  )
}

export default MiniMenu
