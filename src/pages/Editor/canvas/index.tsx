import type { FC } from 'react'
import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import RenderModels from './components/RenderModels'
import RenderMesh from './components/RenderMesh'
import MiniMenu from './components/MiniMenu'
import ReactLoading from '@/components/Loding'
import store from '@/store'
import './index.scss'

interface EditorProps {

}

const CanvasContent = () => {
  const { scene, camera, controls } = useThree()
  const { schema } = store.schemaStore(state => ({
    schema: state.data,
  }))
  const { orbitControlsEnabled, gridHelperEnabled, axesHelperEnabled } = store.settingStore(state => state)
  const { setCurrentScene, setCurrentMainCamera, setCurrentControls } = store.threeStore(state => state)

  useEffect(() => {
    scene && setCurrentScene(scene)
    camera && setCurrentMainCamera(camera)
    controls && setCurrentControls(controls as any)
  }, [scene, camera, controls])

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
    <>
      { gridHelperEnabled && <gridHelper args={[100, 50]} />}
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
    </>
  )
}

const Center: FC<EditorProps> = () => {
  const { initialMainCameraPosition } = store.schemaStore(state => ({
    initialMainCameraPosition: state.initialMainCameraPosition,
  }))
  return (
    <div className='editor-center'>
      <Suspense fallback={<ReactLoading />}>
        <Canvas frameloop='demand' camera={{ position: initialMainCameraPosition }} style={{ backgroundColor: '#222' }}>
          <CanvasContent/>
        </Canvas>
      </Suspense>
      <MiniMenu/>
    </div>
  )
}

export default Center
