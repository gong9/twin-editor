import { create } from 'zustand'

/**
 * @file: 编辑器全局设置
 */

export interface SettingStoreProps {
  configVisible: boolean
  orbitControlsEnabled: boolean
  setConfigVisible: (visible: boolean) => void
  setOrbitControlsEnabled: (enabled: boolean) => void
}

const settingStore = create<SettingStoreProps>(set => ({
  configVisible: false, // 配置面板是否可见
  orbitControlsEnabled: true, // 是否启用轨道控制器

  setConfigVisible: (visible: boolean) => set({ configVisible: visible }),
  setOrbitControlsEnabled: (enabled: boolean) => set({ orbitControlsEnabled: enabled }),
}))

export type SettingStoreType = typeof settingStore

export default settingStore
