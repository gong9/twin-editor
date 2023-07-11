import type { FC } from 'react'
import { useMemo } from 'react'
import { Input, InputNumber } from 'antd'
import type { Vector3 } from 'three'

import type { SelectCubeType } from '@/store/schema'
import store from '@/store'
import type { BaseConfigTypeItem, MeshType, ModelType } from '@/type/SchemaType'

interface ConfigurationFormProps {
  currentCubeSchema: SelectCubeType
}

interface BaseConfigDataType {
  position: Vector3
  rotation?: Vector3
  scale?: Vector3
}

const ConfigurationForm: FC<ConfigurationFormProps> = ({ currentCubeSchema }) => {
  const { updateMesh, updateModel } = store.schemaStore(state => state)
  const isModelData = useMemo(() => {
    // eslint-disable-next-line no-prototype-builtins
    return currentCubeSchema && currentCubeSchema.hasOwnProperty('source')
  }, [currentCubeSchema])

  const handleBaseConfigItemChange = (value: any, name: string, axle: string) => {
    const currentCubeNode = currentCubeSchema

    if (currentCubeNode && (currentCubeNode as any)[name]) {
      (currentCubeNode as any)[name][axle] = value

      if (isModelData) {
        updateModel(
          currentCubeSchema.uid,
          currentCubeNode as ModelType,
        )
      }
      else {
        updateMesh(
          currentCubeSchema.uid,
          currentCubeNode as MeshType,
        )
      }
    }
  }

  const renderBaseConfigItem = (baseConfig: BaseConfigTypeItem, value?: Vector3) => {
    switch (baseConfig.type) {
      case 'input':
        return (
          <div>
            <span>{baseConfig.label}</span>
            <Input className='mt-1'/>
          </div>
        )
      case 'input-number':
        return (
          <InputNumber />
        )

      case 'input-xyz':
        return (
          <div>
            <span>{baseConfig.label}</span>
            <div className='mt-1'>
              <InputNumber onChange={value => handleBaseConfigItemChange(value, baseConfig.name, 'x')} value={value?.x} className='w-16 mr-2' controls={false}/>
              <InputNumber onChange={value => handleBaseConfigItemChange(value, baseConfig.name, 'y')} value={value?.y} className='w-16 mr-2' controls={false}/>
              <InputNumber onChange={value => handleBaseConfigItemChange(value, baseConfig.name, 'z')} value={value?.z} className='w-16' controls={false}/>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderBaseConfig = (baseConfig: BaseConfigTypeItem[], baseConfigData: BaseConfigDataType) => {
    return baseConfig.map((item) => {
      return (
        <div className='mt-1' key={item.name}>
          { renderBaseConfigItem(item, baseConfigData[item.name])}
        </div>
      )
    })
  }

  return (
    <div>
      基本配置信息
      <div>
        {currentCubeSchema && renderBaseConfig(currentCubeSchema.baseConfig, {
          position: currentCubeSchema.position,
          rotation: currentCubeSchema.rotation,
          scale: currentCubeSchema.scale,
        })}
      </div>
    </div>
  )
}

export default ConfigurationForm
