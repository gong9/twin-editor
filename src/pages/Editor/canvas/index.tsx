import type { FC } from 'react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { PerspectiveCamera } from 'three'

import RenderModels from './components/RenderModels'
import RenderMesh from './components/RenderMesh'
import { getMainCamera } from './3d/index'
import ReactLoading from '@/components/Loding'
import store from '@/store'

// import
import './index.scss'

interface EditorProps {

}

const CanvasContent = () => {
  const { scene, camera, controls, gl } = useThree()
  const { schema } = store.schemaStore(state => ({
    schema: state.data,
  }))
  const { orbitControlsEnabled, gridHelperEnabled, axesHelperEnabled, configVisible } = store.settingStore(state => state)
  const { setCurrentScene, setCurrentMainCamera, setCurrentControls } = store.threeStore(state => state)

  useEffect(() => {
    scene && setCurrentScene(scene)
    camera && setCurrentMainCamera(camera)
    controls && setCurrentControls(controls as any as OrbitControlsImpl)
  }, [scene, camera, controls])

  const renderMeshView = () => {
    return (schema.mesh ?? []).map((mesh, index) => {
      return <RenderMesh key={mesh.uid + index} mesh={mesh}/>
    })
  }

  const renderModelView = () => {
    return (schema.model ?? []).map((model, index) => {
      return <RenderModels key={model.uid + index} model={model}/>
    })
  }

  return (
    <>
      { gridHelperEnabled && <gridHelper args={[100, 50]} />}
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      { axesHelperEnabled && <axesHelper args={[10]} />}
      <OrbitControls camera={camera} enabled={orbitControlsEnabled} makeDefault/>
      <GizmoHelper alignment="top-right" margin={configVisible ? [400, 60] : [90, 60]}>
        <GizmoViewport scale={30}/>
        {/* <GizmoViewcube opacity={0.85} /> */}
      </GizmoHelper>
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
  const canvasRef = useRef<HTMLDivElement>(null)
  const [isRenderCanvas, setIsRenderCanvas] = useState(false)

  // const { initialMainCameraPosition } = store.schemaStore(state => ({
  //   initialMainCameraPosition: state.initialMainCameraPosition,
  // }))

  const { angleOfView } = store.settingStore(state => ({
    angleOfView: state.angleOfView,
  }))

  console.log('angleOfView', angleOfView)

  useEffect(() => {
    if (canvasRef.current)
      setIsRenderCanvas(true)
  }, [])

  return (
    <div className='h-screen absolute w-full' ref={canvasRef}>
      {isRenderCanvas
        && <Suspense fallback={<ReactLoading />}>
          <Canvas camera={getMainCamera(canvasRef, angleOfView)! as (PerspectiveCamera) } frameloop='demand' style={{ backgroundColor: '#222' }}>
            <CanvasContent/>
          </Canvas>
        </Suspense>
      }
    </div>
  )
}

export default Center
