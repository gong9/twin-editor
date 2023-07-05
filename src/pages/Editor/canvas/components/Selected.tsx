import type { FC } from 'react'
import { useRef, useState } from 'react'
import { TransformControls } from '@react-three/drei'

interface SelectdCubeProps {
  children?: any
}

type TransformControlsModeType = 'translate' | 'rotate' | 'scale'

enum TransformControlsModeItem {
  translate = 'translate',
  rotate = 'rotate',
  scale = 'scale',
}

const SelectdCube: FC<SelectdCubeProps> = ({ children }) => {
  const transform = useRef(null)
  const [transformControlsMode, setTransformControlsMode] = useState<TransformControlsModeType>(TransformControlsModeItem.translate)

  return (
    <TransformControls enabled={true} ref={transform} mode={transformControlsMode}>
      {children}
    </TransformControls>

  )
}

export default SelectdCube
