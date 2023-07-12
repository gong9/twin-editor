import type { FC } from 'react'

import './index.scss'

interface MiniMenuProps {

}

interface MiniMenuDataItem {
  name: string
  icon: string
}

const MiniMenu: FC<MiniMenuProps> = () => {
  const miniMenuData: MiniMenuDataItem[] = [
    {
      name: 'select',
      icon: 'icon-shubiaojiantou',
    },
    {
      name: 'move',
      icon: 'icon-yidong',
    },
    {
      name: 'scale',
      icon: 'icon-suofang',
    },
    {
      name: 'rotate',
      icon: 'icon-xuanzhuan',
    },
    {
      name: '2d-view',
      icon: 'icon-view_d',
    },
  ]

  const renderMiiMenuList = () => {
    return miniMenuData.map((item) => {
      return (
        <div key={item.name} className='w-8 h-8 flex justify-center items-center rounded mb-2 cursor-pointer' style={{ backgroundColor: '#000', opacity: '0.8' }}>
          <span className={`iconfont ${item.icon}`} style={{ fontSize: '15px' }}></span>
        </div>
      )
    })
  }

  return (
    <div className='mini-menu'>
      {renderMiiMenuList()}
    </div>
  )
}

export default MiniMenu
