import type { FC } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Menu } from 'antd'

import type { Vector3 } from 'three'
import presets from './presets'
import store from '@/store'
import { BASECONFIG } from '@/constants'
import type { BaseConfigTypeItem } from '@/type/SchemaType'
import './index.scss'

interface LeftProps {

}

interface DataSourcesType {
  label: string
  name: string
  key: string
  source?: string
  children?: DataSourcesType[]
}

const dataSources: DataSourcesType[] = [
  {
    label: '模型',
    name: 'material',
    key: 'material',
    children: [
      {
        name: 'diamond',
        key: 'diamond',
        label: '钻石',
        source: './gltf/dflat.glb',
      },
      {
        name: 'monkey',
        key: 'monkey',
        label: '猴子',
        source: './gltf/monkey.glb',
      },
      {
        name: 'wall',
        key: 'wall',
        label: '工厂',
        source: './gltf/wall.glb',
      },
      {
        name: 'tree',
        key: 'tree',
        label: '垂柳',
        source: './gltf/tree.glb',
      },
      {
        name: 'bus',
        key: 'bus',
        label: '公交',
        source: './gltf/bus.glb',
      },
      {
        name: 'house',
        key: 'house',
        label: '建筑',
        source: './gltf/house.glb',
      },
    ],
  },
  {
    label: '物体',
    name: 'structure',
    key: 'structure',
    children: [
      {
        name: 'boxGeometry',
        key: 'boxGeometry',
        label: '立方体',
      },
      {
        name: 'planeGeometry',
        key: 'planeGeometry',
        label: '平面',
      },

    ],
  },
]

const Left: FC<LeftProps> = () => {
  const [currentRenderItem, setCurrentRenderItem] = useState(dataSources[0]?.children || [])
  const [currentSelectedType, setCurrentSelectedType] = useState(dataSources[0].name)
  const schemaStore = store.schemaStore(state => state)

  const getDefaultGeometry = (type: string) => {
    const resObj = {
      type,
    }

    switch (type) {
      case 'boxGeometry':
        return { ...presets.boxGeometry, ...resObj }
      case 'planeGeometry':
        return { ...presets.planeGeometry, ...resObj }
    }

    return resObj
  }

  const addObject = (baseItem: DataSourcesType) => {
    switch (currentSelectedType) {
      case 'structure':

        // eslint-disable-next-line no-case-declarations
        const geometry = getDefaultGeometry(baseItem.name)

        schemaStore.addMesh({
          name: baseItem.name,
          uid: uuidv4(),
          position: {
            x: ~(Math.random() * 5).toFixed(1),
            y: -~(Math.random()).toFixed(1),
            z: ~(Math.random() * 5).toFixed(1),
          } as Vector3,
          geometry: geometry as any,
          material: {
            type: 'meshBasicMaterial',
          },
          baseConfig: BASECONFIG as BaseConfigTypeItem[],
        })
        break
      case 'material':
        schemaStore.addModel({
          name: baseItem.name,
          uid: uuidv4(),
          position: {
            x: ~(Math.random() * 5).toFixed(1),
            y: -~(Math.random()).toFixed(1),
            z: ~(Math.random() * 5).toFixed(1),
          } as Vector3,
          type: 'gltf',
          source: baseItem.source as string,
          baseConfig: BASECONFIG as BaseConfigTypeItem[],
        })
        break
      default:
        break
    }
  }

  /**
   * toggle tyle
   * @param type
   */
  const handleSelect = ({ key }: { key: string }) => {
    setCurrentSelectedType(key)
    setCurrentRenderItem(
      dataSources.find(item => item.key === key)?.children || [],
    )
  }

  return (
    <div className='absolute top-0 left-0 z-10 h-full flex editor-left mb-2 pt-2' style={{ backgroundColor: '#252526' }}>
      <div className='flex flex-col editor-left-menu pr-1' >
        <Menu theme="dark" defaultSelectedKeys={[dataSources[0].key]} onClick={handleSelect} mode="vertical"
          items={dataSources.map(item => ({ ...item, children: null }))}
          style={{ backgroundColor: '#252526', color: '#ccc' }}/>
      </div>
      <div className='editor-left-item pl-1' style={{ width: '150px', height: 'auto' }}>
        <div className='flex flex-wrap h-min'>
          {
        currentRenderItem.map((item) => {
          return <div onClick={() => addObject(item)} className='hover:bg-slate-400 bg-slate-300 cursor-pointer w-14 h-10 m-1 flex justify-center items-center text-sm rounded' key={item.name}>{item.label}</div>
        })
      }
        </div>
      </div>
    </div>
  )
}

export default Left
