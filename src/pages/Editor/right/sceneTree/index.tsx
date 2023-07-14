import type { FC } from 'react'
import { Collapse, Tree } from 'antd'
import type { CollapseProps } from 'antd'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import { Vector3 } from 'three'

import store from '@/store'

interface SceneTreeProps {

}
const { DirectoryTree } = Tree

const SceneTree: FC<SceneTreeProps> = () => {
  const { sceneTree } = store.schemaStore(state => state)
  const { currentScene, currentMainCamera, currentControls } = store.threeStore(state => state)

  const treeData: DataNode[] = sceneTree

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    if (currentScene && currentMainCamera && currentControls) {
      const cube = currentScene.getObjectByName(keys[0] as string) // todo： 优化
      if (cube) {
        currentControls.target.copy(cube.position)
        currentControls.object.lookAt(cube.position)
        currentControls.object.position.copy(new Vector3(cube.position.x, cube.position.y + 10, cube.position.z + 10))
        currentControls.update()
      }
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
