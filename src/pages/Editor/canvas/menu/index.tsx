import type { FC } from 'react'
import { message } from 'antd'

import store from '@/store'
import useModeStore from '@/store/mode'

interface MenuProps {

}

const Menu: FC<MenuProps> = () => {
  const { setDrawline } = useModeStore(state => state)
  const { data } = store.schemaStore(state => state)

  const MenuItem = [
    {
      label: '画线',
      icon: 'icon-compile_icon_normal',
      onClick: () => {
        // if (data.mesh && data.mesh.find(item => item.name === 'planeGeometry'))
        //   setDrawline(true)
        // else
        //   message.info('请先添加一个平面')
      },
    },
    {
      label: '吸附',
      icon: 'icon-a-xitieshixiyin',
    },
    {
      label: '复制',
      icon: 'icon-fuzhi',
    },
    {
      label: '删除',
      icon: 'icon-shanchu',
    },
  ]

  const renderMenuItem = () => {
    return MenuItem.map((menuItem) => {
      return (
        <div key={menuItem.label} className='bg-black w-6 h-6 mr-2 text-white flex justify-center items-center rounded cursor-pointer'>
          <span onClick={menuItem?.onClick} className={`iconfont text-sm ${menuItem.icon}`}/>
        </div>
      )
    })
  }
  return (
    <div className='absolute h-3 top-3 left-[50%] ml-[-50%] z-10 w-screen justify-center flex'>
      <div className='flex justify-center h-6 opacity-65 overflow-hidden'>
        {renderMenuItem()}
      </div>
    </div>
  )
}

export default Menu
