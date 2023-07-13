import type { FC } from 'react'
import { Collapse, Tree } from 'antd'
import type { CollapseProps } from 'antd'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'

import store from '@/store'

interface SceneTreeProps {

}
const { DirectoryTree } = Tree

const SceneTree: FC<SceneTreeProps> = () => {
  const { sceneTree } = store.schemaStore(state => state)
  const { currentScene, currentMainCamera } = store.threeStore(state => state)

  const treeData: DataNode[] = sceneTree

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    if (currentScene && currentMainCamera) {
      const cube = currentScene.getObjectByName(keys[0] as string)
      cube && currentMainCamera.lookAt(cube.position)
    }
  }

  const items: CollapseProps['items'] = [
    {
      key: 'scene-tree',
      label: '场景树',
      children: (
        <DirectoryTree
          defaultExpandAll
          onSelect={onSelect}
          treeData={treeData}
          />
      ),
    },
  ]

  return (
    <Collapse items={items} defaultActiveKey={['scene-tree']} />
  )
}

export default SceneTree
