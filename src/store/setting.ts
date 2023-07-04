import { create } from 'zustand'

/**
 * @file: 编辑器全局设置
 */

export interface SettingStoreProps {
  configVisible: boolean
  setConfigVisible: (visible: boolean) => void
}

const settingStore = create<SettingStoreProps>(set => ({
  configVisible: false, // 配置面板是否可见

  setConfigVisible: (visible: boolean) => set({ configVisible: visible }),
}))

export type SettingStoreType = typeof settingStore

export default settingStore
