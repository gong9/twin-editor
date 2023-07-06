import type { FC } from 'react'
import { memo, useMemo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { TransformControls } from '@react-three/drei'
import type { Vector3 } from 'three'

import { TransformControlsModeItem } from './RenderMesh'
import useGltfScene from '@/hooks/useGltfScene'
import type { ModelType } from '@/type/SchemaType'

interface RenderModelProps {
  model: ModelType
}

const RenderModels: FC<RenderModelProps> = ({ model }) => {
  const transform = useRef(null)
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
      <TransformControls
        position={currentPosition as any as Vector3}
        size={1}
        ref={transform}
        mode={TransformControlsModeItem.translate}>
        <primitive object={currentScene} />
      </TransformControls>
    </>
  )
}

export default memo(RenderModels, (prevProps, nextProps) => {
  return isEqual(prevProps.model, nextProps.model)
})
