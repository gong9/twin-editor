import type { FC } from 'react'

interface MenuProps {

}

const MenuItem = [
  {
    label: '画线',
    icon: 'icon-compile_icon_normal',
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

const Menu: FC<MenuProps> = () => {
  const renderMenuItem = () => {
    return MenuItem.map((menuItem) => {
      return (
        <div key={menuItem.label} className='bg-black w-6 h-6 mr-2 text-white flex justify-center items-center rounded cursor-pointer'>
          <span className={`iconfont text-sm ${menuItem.icon}`}/>
        </div>
      )
    })
  }
  return (
    <div className='absolute h-3 top-3 left-[50%] ml-[-53%] z-10 w-screen justify-center flex'>
      <div className='flex justify-center h-6 opacity-65 overflow-hidden'>
        {renderMenuItem()}
      </div>
    </div>
  )
}

export default Menu
