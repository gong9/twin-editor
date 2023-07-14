import type { FC } from 'react'
import { useMemo } from 'react'
import { Input, InputNumber } from 'antd'
import type { Euler, Vector3 } from 'three'
import { produce } from 'immer'

import type { SelectCubeType } from '@/store/schema'
import store from '@/store'
import type { BaseConfigTypeItem, MeshType, ModelType } from '@/type/SchemaType'
import './index.scss'

interface ConfigurationFormProps {
  currentCubeSchema: SelectCubeType
}

interface BaseConfigDataType {
  position: Vector3
  rotation?: Euler
  scale?: Vector3
}

const ConfigurationForm: FC<ConfigurationFormProps> = ({ currentCubeSchema }) => {
  const { updateMesh, updateModel, setCurrentSelectedMesh } = store.schemaStore(state => state)
  const isModelData = useMemo(() => {
    // eslint-disable-next-line no-prototype-builtins
    return currentCubeSchema && currentCubeSchema.hasOwnProperty('source')
  }, [currentCubeSchema])

  const handleBaseConfigItemChange = (value: any, name: string, axle: string) => {
    const currentCubeNode = currentCubeSchema

    if ((value === 0 || value) && currentCubeNode && (currentCubeNode as any)[name]) {
      const nextCubeNodeState = produce(currentCubeNode, (draft) => {
        (draft as any)[name][axle] = value
      })

      if (isModelData) {
        updateModel(
          currentCubeSchema.uid,
          nextCubeNodeState as ModelType,
        )
      }
      else {
        updateMesh(
          currentCubeSchema.uid,
          nextCubeNodeState as MeshType,
        )
      }
      setCurrentSelectedMesh(nextCubeNodeState)
    }
  }

  const renderBaseConfigItem = (baseConfig: BaseConfigTypeItem, value?: Vector3 | Euler) => {
    switch (baseConfig.type) {
      case 'input':
        return (
          <div className='flex flex-col'>
            <span className='text-sm title'>{baseConfig.label} :</span>
            <Input className='mt-1 w-14 ml-2 input-config ' value={0}/>
          </div>
        )
      case 'input-xyz':
        return (
          <div className='flex flex-col'>
            <span className='text-sm title'>{baseConfig.label} :</span>
            <div className='mt-1 ml-2'>
              <InputNumber onChange={value => handleBaseConfigItemChange(value, baseConfig.name, 'x')} value={(value && value?.x.toFixed(2)) || 1} className='w-14 mr-2 input-config' controls={false}/>
              <InputNumber onChange={value => handleBaseConfigItemChange(value, baseConfig.name, 'y')} value={(value && value?.y.toFixed(2)) || 1} className='w-14 mr-2 input-config' controls={false}/>
              <InputNumber onChange={value => handleBaseConfigItemChange(value, baseConfig.name, 'z')} value={(value && value?.z.toFixed(2)) || 1} className='w-14 input-config' controls={false}/>
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
        <div className='mt-2' key={item.name}>
          { renderBaseConfigItem(item, baseConfigData[item.name])}
        </div>
      )
    })
  }

  return (
    <div className='p-2 base-config'>
      <h3 className='base-config-title mb-3'>基本配置信息</h3>
      <div className='base-config-body'>
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
