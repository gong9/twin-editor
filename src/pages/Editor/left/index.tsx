import type { FC } from 'react'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import type { Vector3 } from 'three'
import store from '@/store'

interface LeftProps {

}

interface DataSourcesType {
  label: string
  name: string
  children?: DataSourcesType[]
}

const dataSources: DataSourcesType[] = [
  {
    label: '结构',
    name: 'structure',
    children: [
      {
        name: 'wall',
        label: '画墙',
      },
      {
        name: 'door',
        label: '异形墙',
      },
    ],
  },
  {
    label: '材质',
    name: 'material',
    children: [
      {
        name: 'wall',
        label: '贴图',
      },
    ],
  },
  {
    label: '模型',
    name: 'model',
    children: [
      {
        name: 'wall',
        label: '物品',
      },
    ],
  },
]

const Left: FC<LeftProps> = () => {
  const [currentRenderItem, setCurrentRenderItem] = useState(dataSources[0]?.children || [])
  const schemaStore = store.schemaStore(state => state)

  const addMesh = () => {
    schemaStore.addMesh({
      uid: uuidv4(),
      position: {
        x: ~(Math.random() * 10).toFixed(1),
        y: ~(Math.random()).toFixed(1),
        z: ~(Math.random() * 10).toFixed(1),
      } as Vector3,
      geometry: {
        type: 'boxGeometry',
        width: 1,
        height: 1,
        depth: 1,
      },
      material: {
        type: 'meshBasicMaterial',
      },
    })
  }

  const toggleTyle = (type: string) => {

  }

  return (
    <div className='flex rounded-md' style={{ height: '100%', width: '300px' }}>
      <div className='flex flex-col pl-2 w-16' style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }} >
        {dataSources.map((item) => {
          return <div onClick={() => toggleTyle(item.name)} className='w-8 mt-6 cursor-pointer' key={item.label}>{item.label}</div>
        })}
      </div>

      <div className='flex flex-wrap justify-start cursor-pointer' style={{ width: '150px', backgroundColor: 'rgba(200, 200, 200, 0.7)' }}>
        {
        currentRenderItem.map((item) => {
          return <div onClick={addMesh} className='w-16 h-16 m-1 flex justify-center items-center text-sm' style={{ backgroundColor: 'rgb(221, 221, 221)' }} key={item.name}>{item.label}</div>
        })
      }
      </div>
    </div>
  )
}

export default Left
