import type { FC } from 'react'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import RenderModels from './components/RenderModels'
import RenderMesh from './components/RenderMesh'
import ReactLoading from '@/components/Loding'
import store from '@/store'

interface EditorProps {

}

const Center: FC<EditorProps> = () => {
  const schema = store.schemaStore(state => state.data)
  const { orbitControlsEnabled, gridHelperEnabled, axesHelperEnabled } = store.settingStore(state => state)

  const renderMeshView = () => {
    return (schema.mesh ?? []).map((mesh) => {
      return <RenderMesh key={mesh.uid} mesh={mesh}/>
    })
  }

  const renderModelView = () => {
    return (schema.model ?? []).map((model) => {
      return <RenderModels key={model.uid} model={model}/>
    })
  }

  return (
    <Suspense fallback={<ReactLoading />}>
      <Canvas frameloop='demand' camera={{ position: [0, 3, 3] }} style={{ backgroundColor: '#000000', width: '100%' }}>
        { gridHelperEnabled && <gridHelper args={[10, 50]} />}
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        { axesHelperEnabled && <axesHelper args={[10]} />}
        <OrbitControls enabled={orbitControlsEnabled} makeDefault/>
        {
        renderMeshView()
        }
        {
        renderModelView()
        }
      </Canvas>
    </Suspense>
  )
}

export default Center
