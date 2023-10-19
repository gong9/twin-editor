import type { FC } from 'react'
import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { GizmoHelper, GizmoViewcube, GizmoViewport, OrbitControls, OrthographicCamera } from '@react-three/drei'
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib'
import type { PerspectiveCamera } from 'three'
import classnames from 'classnames'

import RenderModels from './components/RenderModels'
import RenderMesh from './components/RenderMesh'
import { getMainCamera } from './3d/index'
import useModeStore from '@/store/mode'
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
      {/* <OrthographicCamera
        makeDefault
        zoom={1}
        top={3000}
        bottom={-3000}
        left={3000}
        right={-3000}
        near={1}
        far={2000}
        position={[0, 0, 10]}
      /> */}
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
  const { drawline } = useModeStore(state => state)

  // const { initialMainCameraPosition } = store.schemaStore(state => ({
  //   initialMainCameraPosition: state.initialMainCameraPosition,
  // }))

  const { angleOfView } = store.settingStore(state => ({
    angleOfView: state.angleOfView,
  }))

  useEffect(() => {
    if (canvasRef.current)
      setIsRenderCanvas(true)
  }, [])

  return (
    <div className={classnames('h-screen absolute w-full editor', { drawline })} ref={canvasRef}>
      {isRenderCanvas
        && <Suspense fallback={<ReactLoading />}>
          <Canvas camera={getMainCamera(canvasRef, angleOfView)! as (PerspectiveCamera) } style={{ backgroundColor: '#222' }}>
            <CanvasContent/>
          </Canvas>
        </Suspense>
      }
    </div>
  )
}

export default Center
