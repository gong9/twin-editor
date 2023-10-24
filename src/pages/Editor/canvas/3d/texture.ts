import type { Wrapping } from 'three'
import { TextureLoader } from 'three'
import type { TextureParamsType } from '@/utils/lineDerivation'

export const getCubeTextures = (materialParamsConfig: TextureParamsType | undefined) => {
  if (!materialParamsConfig || !materialParamsConfig.texture)
    return

  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(materialParamsConfig.texture)

  if (materialParamsConfig.wrapS)
    texture.wrapS = materialParamsConfig.wrapS as Wrapping

  if (materialParamsConfig.wrapT)
    texture.wrapT = materialParamsConfig.wrapT as Wrapping

  if (materialParamsConfig.repeatX)
    texture.repeat.x = materialParamsConfig.repeatX

  if (materialParamsConfig.repeatY)
    texture.repeat.y = materialParamsConfig.repeatY

  return texture
}
