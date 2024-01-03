import type { FC, ReactNode } from 'react'
import { useEffect, useRef, useState } from 'react'
import { TransformControls } from '@react-three/drei'
import type { Box3, Vector3 } from 'three'
import { Euler } from 'three'
import type { MeshType, ModelType } from '@/type/SchemaType'
import useModeStore from '@/store/mode'
import store from '@/store'

interface SelectdCubeProps {
  children: ReactNode
  cube: MeshType | ModelType
  cubeType: CubeType
  currentPosition: number[]
  currentBoundingBox?: Box3 | null
  currentScale: number[]
  currentRotation: Euler | undefined
  setCurrentPosition: (position: number[]) => void
  setCurrentScale: (scale: number[]) => void
  setCurrentRotation: (rotation: Euler) => void
}

export enum CubeType {
  'mesh' = 'mesh',
  'model' = 'model',
}

const SelectdCube: FC<SelectdCubeProps> = ({ children, cube, cubeType, currentPosition, currentScale, currentRotation, setCurrentRotation, currentBoundingBox, setCurrentPosition, setCurrentScale }) => {
  const transform = useRef(null)
  const [isSelected, setIsSelected] = useState(false)
  const schemaStore = store.schemaStore()
  const transformControlsMode = store.settingStore(state => state.transformControlsMode)
  const { drawline } = useModeStore(state => state)

  useEffect(() => {
    if (schemaStore.currentSelectedMesh?.uid !== cube.uid)
      setIsSelected(false)
  }, [schemaStore.currentSelectedMesh])

  useEffect(() => {
    if (drawline) {
      setIsSelected(false)
      schemaStore.setCurrentSelectedMesh(null)
    }
  }, [drawline])

  const handleSelected = () => {
    if (!(schemaStore.currentSelectedMesh?.uid === cube.uid) && !drawline && cube.name !== 'planeGeometry') {
      schemaStore.setCurrentSelectedMesh(cube)
      setIsSelected(true)
    }
  }

  /**
   * update cube store and component state
   */
  const handleTransformControlsMouseUp = () => {
    const object = (transform.current! as any).object
    setCurrentPosition(object.position)
    setCurrentScale(object.scale)
    setCurrentRotation(object.rotation)

    // todo: add worker
    if (cubeType === CubeType.mesh) {
      schemaStore.updateMesh(
        cube.uid,
        {
          ...(cube as MeshType),
          position: object.position,
          rotation: object.rotation,
          scale: object.scale,
        },
      )
    }

    if (cubeType === CubeType.model) {
      schemaStore.updateModel(
        cube.uid,
        {
          ...(cube as ModelType),
          position: object.position,
          rotation: object.rotation,
          scale: object.scale,
        },
      )
    }

    schemaStore.setCurrentSelectedMesh(cube)
  }

  return (
    <group onClick={() => handleSelected()}>
      {
        isSelected
          ? (
            <TransformControls
              size={0.5}
              position={currentPosition as unknown as Vector3}
              scale={currentScale as unknown as Vector3}
              rotation={currentRotation ? new Euler(currentRotation.x, currentRotation.y, currentRotation.z, currentRotation.order) : undefined}
              onMouseUp={handleTransformControlsMouseUp}
              enabled={true}
              ref={transform}
              mode={transformControlsMode} >
              <group>
                {children as any}
                { currentBoundingBox && <box3Helper box={currentBoundingBox}/>}
              </group>
            </TransformControls>
            )
          : (
            <group name={cube.uid} scale={currentScale as unknown as Vector3} rotation={currentRotation ? new Euler(currentRotation.x, currentRotation.y, currentRotation.z, currentRotation.order) : undefined} position={currentPosition as unknown as Vector3}>
              {children}
            </group>
            )
      }
    </group>
  )
}

export default SelectdCube
