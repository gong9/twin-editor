import type { FC } from 'react'
import { useRef } from 'react'
import { useLoader } from '@react-three/fiber'
import { TransformControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

import { TransformControlsModeItem } from './RenderMesh'

interface RenderGlbProps {

}

const RenderGlb: FC<RenderGlbProps> = () => {
  const transform = useRef(null)
  const gltf = useLoader(GLTFLoader, './monkey.glb')

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
