import type { FC } from 'react'
import { Input, InputNumber } from 'antd'
import type { Vector3 } from 'three'

import type { SelectCubeType } from '@/store/schema'
import type { baseConfigTypeItem } from '@/type/SchemaType'

interface ConfigurationFormProps {
  currentCubeSchema: SelectCubeType
}

interface BaseConfigDataType {
  position: Vector3
  rotation?: Vector3
  scale?: Vector3
}

const ConfigurationForm: FC<ConfigurationFormProps> = ({ currentCubeSchema }) => {
  const handleChange = (value: string | number | boolean) => {}

  const renderBaseConfigItem = (baseConfig: baseConfigTypeItem, value?: Vector3) => {
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
              <InputNumber value={value?.x} className='w-16 mr-2' controls={false}/>
              <InputNumber value={value?.y} className='w-16 mr-2' controls={false}/>
              <InputNumber value={value?.z} className='w-16' controls={false}/>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  const renderBaseConfig = (baseConfig: baseConfigTypeItem[], baseConfigData: BaseConfigDataType) => {
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
