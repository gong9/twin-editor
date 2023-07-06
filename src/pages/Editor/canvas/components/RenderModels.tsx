import type { FC } from 'react'
import { useRef, useState } from 'react'
import { useLoader } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import type { Vector3 } from 'three'

import { TransformControlsModeItem } from './RenderMesh'
import type { ModelType } from '@/type/SchemaType'

interface RenderGlbProps {
  model: ModelType
}

const RenderGlb: FC<RenderGlbProps> = ({ model }) => {
  const transform = useRef(null)
  const { position } = model
  const [currentPosition, setCurrentPosition] = useState([position.x, position.y, position.z])
  const { scene } = useLoader(GLTFLoader, model.source)

  return (
    <>
      <TransformControls
        position={currentPosition as any as Vector3}
        size={1}
        ref={transform}
        mode={TransformControlsModeItem.translate}>
        <mesh
          geometry={(scene.children[0] as any).geometry}
          material={(scene.children[0] as any).material}
        />
      </TransformControls>
    </>
  )
}

export default RenderGlb
