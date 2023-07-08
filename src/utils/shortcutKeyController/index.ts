import hotkeys from 'hotkeys-js'
import type { ShortcutKey } from './shortcutKeyManage'
import { editorShortcuts } from './shortcutKeyManage'

type HandleFunctionType = () => void

const factoryFunction = (ShortcutKeyData: ShortcutKey) => {
  return (handleFunction: HandleFunctionType) => {
    hotkeys(ShortcutKeyData.key, (event) => {
      event.preventDefault()
      handleFunction()
    })
  }
}

type FactoryFunctionType = typeof factoryFunction

const shortcutKeyRegister = () => {
  const shortcutKeyControllerMap = new Map<string, ReturnType<FactoryFunctionType> >()

  editorShortcuts.forEach((shortcutKey) => {
    shortcutKeyControllerMap.set(shortcutKey.name, factoryFunction(shortcutKey))
  })

  return shortcutKeyControllerMap
}

export type ShortcutKeyControllerMapType = ReturnType<typeof shortcutKeyRegister>

export default shortcutKeyRegister
