import type { FC } from 'react'
import { Collapse, Tree } from 'antd'
import type { CollapseProps } from 'antd'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'

import ConfigurationForm from './configurationFrom'
import store from '@/store'
import './index.scss'

interface RightProps {

}

const { DirectoryTree } = Tree

const Right: FC<RightProps> = () => {
  const { currentSelectedMesh } = store.schemaStore(state => state)
  const { configVisible } = store.settingStore(state => state)
  const treeData: DataNode[] = [
    {
      title: '场景',
      key: '0-0',
      children: [
        { title: '垂柳', key: '0-0-0', isLeaf: true },
        { title: '公交', key: '0-0-1', isLeaf: true },
      ],
    },
  ]
  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    console.log('Trigger Select', keys, info)
  }

  const onExpand: DirectoryTreeProps['onExpand'] = (keys, info) => {
    console.log('Trigger Expand', keys, info)
  }

  const items: CollapseProps['items'] = [
    {
      key: 'scene-tree',
      label: '场景树',
      children: (
        <DirectoryTree
          multiple
          defaultExpandAll
          onSelect={onSelect}
          onExpand={onExpand}
          treeData={treeData}
      />
      ),
    },
  ]
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
    <div className='flex rounded-md editor-right' style={{ height: '100%', width: configVisible ? '400px' : '0', backgroundColor: '#252526', color: '#ccc' }}>
      {renderConfig()}
      <div className='scene-tree'>
        <Collapse items={items} defaultActiveKey={['scene-tree']} />
      </div>
    </div>
  )
}

export default Right
