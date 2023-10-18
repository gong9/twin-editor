import type { FC } from 'react'
import { useMount, useUnmount } from 'ahooks'

import Top from './top'
import Left from './left'
import Center from './canvas'
import Right from './right'
import Bottom from './bottom'
import controller from './controller'
import Menu from './canvas/menu'
import Setting from '@/components/Setting'
import Help from '@/components/Help'
import './index.scss'

interface EditorProps {

}

const Editor: FC<EditorProps> = () => {
  useMount(() => {
    controller.init()
  })

  useUnmount(() => {
    controller.destroy()
  })

  return (
    <div className='editor'>
      <Top/>
      <div className='relative h-full'>
        <Menu/>
        <Left />
        <Center />
        <Right/>
      </div>
      <Setting/>
      <Help/>
    </div>
  )
}

export default Editor
