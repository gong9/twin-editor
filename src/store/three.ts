import { create } from 'zustand'
import type { Camera, EventDispatcher, Scene } from 'three'

/**
 * @file: three.js 相关 store
 */
export interface ThreeStoreProps {
  currentScene: Scene | null
  currentMainCamera: Camera | null
  currentControls: EventDispatcher<Event> | null
  setCurrentScene: (scene: Scene) => void
  setCurrentMainCamera: (camera: Camera) => void
  setCurrentControls: (controls: EventDispatcher<Event>) => void
}

const threeStore = create<ThreeStoreProps>(set => ({
  currentScene: null,
  currentMainCamera: null,
  currentControls: null,

  setCurrentScene: (scene: Scene) => set({ currentScene: scene }),
  setCurrentMainCamera: (camera: Camera) => set({ currentMainCamera: camera }),
  setCurrentControls: (controls: EventDispatcher<Event>) => set({ currentControls: controls }),
}))

export type ThreeStoreType = typeof threeStore

export default threeStore
