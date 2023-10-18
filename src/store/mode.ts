import { create } from 'zustand'

interface ModeStates {
  drawline: boolean
}

interface ModeActions {
  setDrawline: (drawline: boolean) => void
}

const modeStore = create<ModeStates & ModeActions>(set => ({
  drawline: false, // 是否开启绘制线条

  setDrawline: (drawline: boolean) => set({ drawline }),
}))

export default modeStore
