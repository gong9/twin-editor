import type { FC } from 'react'
import { useMount } from 'ahooks'

import Top from './top'
import Left from './left'
import Center from './canvas'
import Right from './right'
import Bottom from './bottom'
import controller from './controller'
import Setting from '@/components/Setting'

interface EditorProps {

}

const Editor: FC<EditorProps> = () => {
  useMount(() => {
    controller.init()
  })

  return (
    <>
      <Top/>
      <div className='flex justify-between' style={{ height: '95vh' }}>
        <Left/>
        <Center />
        <Right/>
      </div>
      <Setting/>
    </>
  )
}

export default Editor
