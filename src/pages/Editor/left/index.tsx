import type { FC } from 'react'
import { useState } from 'react'

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

  const toggleTyle = (type: string) => {

  }

  return (
    <div className='flex' style={{ height: '100%', width: '300px' }}>
      <div className='flex flex-col pl-2 w-16' style={{ backgroundColor: 'rgba(224, 224, 224, 0.7)' }} >
        {dataSources.map((item) => {
          return <div onClick={() => toggleTyle(item.name)} className='w-8 mt-6 cursor-pointer' key={item.label}>{item.label}</div>
        })}
      </div>

      <div className='flex flex-wrap justify-start cursor-pointer' style={{ width: '150px', backgroundColor: 'rgba(200, 200, 200, 0.7)' }}>
        {
        currentRenderItem.map((item) => {
          return <div className='w-16 h-16 m-1 flex justify-center items-center text-sm' style={{ backgroundColor: 'rgb(221, 221, 221)' }} key={item.name}>{item.label}</div>
        })
      }
      </div>
    </div>
  )
}

export default Left
