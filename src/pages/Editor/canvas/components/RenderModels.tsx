import type { FC } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

interface RenderGlbProps {

}

const RenderGlb: FC<RenderGlbProps> = () => {
  const gltf = useLoader(GLTFLoader, './monkey.glb')
  return <primitive object={gltf.scene} />
}

export default RenderGlb
