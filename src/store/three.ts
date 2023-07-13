import { create } from 'zustand'
import type { Camera, Scene } from 'three'

/**
 * @file: three.js 相关 store
 */
export interface ThreeStoreProps {
  currentScene: Scene | null
  currentMainCamera: Camera | null
  setCurrentScene: (scene: Scene) => void
  setCurrentMainCamera: (camera: Camera) => void
}

const threeStore = create<ThreeStoreProps>(set => ({
  currentScene: null,
  currentMainCamera: null,

  setCurrentScene: (scene: Scene) => set({ currentScene: scene }),
  setCurrentMainCamera: (camera: Camera) => set({ currentMainCamera: camera }),
}))

export type ThreeStoreType = typeof threeStore

export default threeStore
