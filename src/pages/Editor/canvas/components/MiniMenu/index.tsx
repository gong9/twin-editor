import type { FC } from 'react'

import store from '@/store'
import './index.scss'

interface MiniMenuProps {

}

interface MiniMenuDataItem {
  name: string
  icon: string
  onClick?: () => void
}

const MiniMenu: FC<MiniMenuProps> = () => {
  const { setTransformControlsMode, transformControlsMode, configVisible, setConfigVisible } = store.settingStore(state => (
    {
      setTransformControlsMode: state.setTransformControlsMode,
      transformControlsMode: state.transformControlsMode,
      configVisible: state.configVisible,
      setConfigVisible: state.setConfigVisible,
    }
  ))
  const currentSelectedMesh = store.schemaStore(state => state.currentSelectedMesh)

  const miniMenuData: MiniMenuDataItem[] = [
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
    <div className='mini-menu'>
      {renderMiiMenuList()}

      <div onClick={() => { setConfigVisible(!configVisible) }} className='config-show-control w-6 h-8 flex justify-center items-center rounded mb-2 cursor-pointer' style={{ backgroundColor: '#000' }}>
        <span className={`iconfont ${configVisible ? 'icon-xiangyoujiantou' : 'icon-xiangzuojiantou'}`} style={{ fontSize: '15px' }}></span>
      </div>
    </div>
  )
}

export default MiniMenu
