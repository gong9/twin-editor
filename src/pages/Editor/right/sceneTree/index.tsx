import type { FC } from 'react'
import { useEffect } from 'react'
import { Collapse, Tree } from 'antd'
import type { CollapseProps } from 'antd'
import type { DataNode, DirectoryTreeProps } from 'antd/es/tree'
import { Vector3 } from 'three'

import { emitter } from '@/utils'
import store from '@/store'

interface SceneTreeProps {

}

const { DirectoryTree } = Tree

const SceneTree: FC<SceneTreeProps> = () => {
  const { sceneTree, initialMainCameraPosition } = store.schemaStore(state => state)
  const { currentScene, currentMainCamera, currentControls } = store.threeStore(state => state)

  const treeData: DataNode[] = sceneTree

  /**
   * reset currentControls and currentMainCamera
   */
  const resetState = () => {
    if (currentControls) {
      currentControls.target.copy(new Vector3(0, 0, 0))
      currentControls.object.position.copy(new Vector3(initialMainCameraPosition[0], initialMainCameraPosition[1], initialMainCameraPosition[2]))
      currentControls.update()
    }
  }

  useEffect(() => {
    emitter.on('resetState', resetState)
  }, [currentControls])

  const onSelect: DirectoryTreeProps['onSelect'] = (keys, info) => {
    if (currentScene && currentMainCamera && currentControls) {
      const cube = currentScene.getObjectByName(keys[0] as string) // todo： 优化
      if (cube) {
        currentControls.target.copy(cube.position)
        currentControls.object.lookAt(cube.position)
        currentControls.object.position.copy(new Vector3(cube.position.x, cube.position.y + 5, cube.position.z + 5))
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
