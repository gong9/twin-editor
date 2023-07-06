import type { FC } from 'react'
import { memo, useRef, useState } from 'react'
import isEqual from 'react-fast-compare'
import { useLoader } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import type { Vector3 } from 'three'

import { TransformControlsModeItem } from './RenderMesh'
import type { ModelType } from '@/type/SchemaType'

interface RenderModelProps {
  model: ModelType
}

const RenderModels: FC<RenderModelProps> = ({ model }) => {
  const transform = useRef(null)
  const { position } = model
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])

  const { scene } = useLoader(GLTFLoader, './gltf/wall.glb', (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.preload()
    loader.setDRACOLoader(dracoLoader)
  })

  scene.traverse((item) => {
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
        <primitive object={scene}/>
      </TransformControls>
    </>
  )
}

export default memo(RenderModels, (prevProps, nextProps) => {
  return isEqual(prevProps.model, nextProps.model)
})
