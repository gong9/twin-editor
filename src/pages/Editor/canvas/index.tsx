import type { FC } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import RenderMesh from './components/RenderMesh'
import store from '@/store'

interface EditorProps {

}

const Center: FC<EditorProps> = () => {
  const schema = store.schemaStore(state => state.data)

  const renderMeshView = () => {
    return (schema.mesh ?? []).map((mesh, index) => {
      return <RenderMesh key={index} geometry={mesh.geometry} material={mesh.material} position={mesh.position}/>
    })
  }

  return (
    <Canvas camera={{ position: [0, 3, 3] }}>
      <gridHelper args={[10, 50]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <axesHelper args={[10]} />
      <OrbitControls />
      {
        renderMeshView()
      }
    </Canvas>
  )
}

export default Center
