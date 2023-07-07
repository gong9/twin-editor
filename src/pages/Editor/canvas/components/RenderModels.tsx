import type { FC } from 'react'
import { memo, useState } from 'react'
import isEqual from 'react-fast-compare'

import SelectdCube, { CubeType } from './Selected'
import useGltfScene from '@/hooks/useGltfScene'
import type { ModelType } from '@/type/SchemaType'

interface RenderModelProps {
  model: ModelType
}

const RenderModels: FC<RenderModelProps> = ({ model }) => {
  const { position } = model
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])

  const currentScene = useGltfScene(model.source)

  /**
   * todo: del this models
   */
  currentScene.traverse((item) => {
    if (item.name === '工厂外墙') {
      item.scale.set(1, 1, 1)
      item.position.set(0, 0, 0)
    }
  })

  return (
    <>
      <SelectdCube cube={model} cubeType={CubeType.model} currentPosition={currentPosition} setCurrentPosition={setCurrentPosition}>
        <primitive object={currentScene} />
      </SelectdCube>
    </>
  )
}

export default memo(RenderModels, (prevProps, nextProps) => {
  return isEqual(prevProps.model, nextProps.model)
})
