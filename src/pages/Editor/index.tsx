import type { FC } from 'react'

import Top from './top'
import Left from './left'
import Center from './canvas'
import Right from './right'
import Bottom from './bottom'
import Setting from '@/components/Setting'

interface EditorProps {

}

const Editor: FC<EditorProps> = () => {
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
