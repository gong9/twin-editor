import { create } from 'zustand'
import type { Camera, Scene } from 'three'
import type { OrbitControls } from 'three-stdlib'

/**
 * @file: three.js 相关 store
 */

interface ThreeStoreStates {
  currentScene: Scene | null
  currentMainCamera: Camera | null
  currentControls: OrbitControls | null
}

interface ThreeStoreActions {
  setCurrentScene: (scene: Scene) => void // TODOS: 貌似没有更新
  setCurrentMainCamera: (camera: Camera) => void
  setCurrentControls: (controls: OrbitControls) => void
}

export type ThreeStoreProps = ThreeStoreStates & ThreeStoreActions

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
