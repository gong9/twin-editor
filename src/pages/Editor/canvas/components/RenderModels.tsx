import type { FC } from 'react'
import type { Euler } from 'three'
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
  const { position, scale, rotation } = model
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const [currentScale, setCurrentScale] = useState([scale?.x || 1, scale?.y || 1, scale?.z || 1])
  const [currentRotation, setCurrentRotation] = useState<Euler | undefined>(rotation)
  const [currentBoundingBox, setCurrentBoundingBox] = useState<Box3 | null>(null)
  const currentScene = useGltfScene(model.source)

  useEffect(() => {
    setCurrentPosition([
      model.position.x,
      model.position.y,
      model.position.z,
    ])
    setCurrentScale([
      model.scale?.x || 1,
      model.scale?.y || 1,
      model.scale?.z || 1,
    ])
  }, [
    model.position,
    model.scale,
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
      <SelectdCube
        cube={model}
        cubeType={CubeType.model}
        currentBoundingBox={currentBoundingBox}
        currentPosition={currentPosition}
        currentScale={currentScale}
        currentRotation={currentRotation}
        setCurrentScale={setCurrentScale}
        setCurrentPosition={setCurrentPosition}
        setCurrentRotation={setCurrentRotation}
        >
        <primitive object={currentScene}/>
      </SelectdCube>
    </>
  )
}

export default memo(RenderModels, (prevProps, nextProps) => {
  return isEqual(prevProps.model, nextProps.model)
})
