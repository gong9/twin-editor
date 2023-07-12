import type { FC } from 'react'
import { Box3 } from 'three'
import { memo, useEffect, useState } from 'react'
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
  const [currentBoundingBox, setCurrentBoundingBox] = useState<Box3 | null>(null)

  const currentScene = useGltfScene(model.source)

  useEffect(() => {
    setCurrentPosition([
      model.position.x,
      model.position.y,
      model.position.z,
    ])
  }, [
    model.position,
  ])

  useEffect(() => {
    if (currentScene)
      setCurrentBoundingBox(new Box3().setFromObject(currentScene))
  }, [currentScene])

  /**
   * todo: del this models
   */
  currentScene.children.forEach((cube) => {
    if (cube.name === 'bus02')
      cube.scale.set(0.005, 0.005, 0.005)

    else
      cube.scale.set(0.2, 0.2, 0.2)

    cube.position.set(0, 0, 0)
  })

  return (
    <>
      <SelectdCube cube={model} cubeType={CubeType.model} currentBoundingBox={currentBoundingBox} currentPosition={currentPosition}
        setCurrentPosition={setCurrentPosition}>
        <primitive object={currentScene}/>
      </SelectdCube>
    </>
  )
}

export default memo(RenderModels, (prevProps, nextProps) => {
  return isEqual(prevProps.model, nextProps.model)
})
