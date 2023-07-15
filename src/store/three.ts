import { create } from 'zustand'
import type { Camera, Scene } from 'three'
import type { OrbitControls } from 'three-stdlib'

/**
 * @file: three.js 相关 store
 */
export interface ThreeStoreProps {
  currentScene: Scene | null
  currentMainCamera: Camera | null
  currentControls: OrbitControls | null
  setCurrentScene: (scene: Scene) => void
  setCurrentMainCamera: (camera: Camera) => void
  setCurrentControls: (controls: OrbitControls) => void
}

const threeStore = create<ThreeStoreProps>(set => ({
  currentScene: null,
  currentMainCamera: null,
  currentControls: null,

  setCurrentScene: (scene: Scene) => set({ currentScene: scene }),
  setCurrentMainCamera: (camera: Camera) => set({ currentMainCamera: camera }),
  setCurrentControls: (controls: OrbitControls) => set({ currentControls: controls }),
}))

export type ThreeStoreType = typeof threeStore

export default threeStore
