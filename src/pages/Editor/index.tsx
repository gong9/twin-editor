import type { FC } from 'react'
import { useMount, useUnmount } from 'ahooks'

import Top from './top'
import Left from './left'
import Center from './canvas'
import Right from './right'
import Bottom from './bottom'
import controller from './controller'
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
      <div className='flex justify-between' style={{ height: '95vh' }}>
        <Left/>
        <Center />
        <Right/>
      </div>
      <Setting/>
      <Help/>
    </div>
  )
}

export default Editor
