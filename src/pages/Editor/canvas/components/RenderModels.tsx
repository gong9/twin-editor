import type { FC } from 'react'
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { TransformControlsModeItem } from './RenderMesh'
import type { ModelType } from '@/type/SchemaType'

interface RenderGlbProps {
  model: ModelType
}

const RenderGlb: FC<RenderGlbProps> = ({ model }) => {
  const transform = useRef(null)
  const gltf = useLoader(GLTFLoader, model.source)

  return (
    <>
      <TransformControls
        size={1}
        ref={transform}
        mode={TransformControlsModeItem.translate}>
        <primitive object={gltf.scene} />
      </TransformControls>
    </>
  )
}

export default RenderGlb
