import { useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

const useGltfScene = (model: string) => {
  const gltf = useLoader(GLTFLoader, model, (loader) => {
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath('./draco/')
    dracoLoader.setDecoderConfig({ type: 'js' })
    dracoLoader.preload()
    loader.setDRACOLoader(dracoLoader)
  })
  const scene = useMemo(() => gltf.scene.clone(), [gltf])

  return scene
}

export default useGltfScene
