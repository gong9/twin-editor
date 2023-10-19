import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'

import useModeStore from '@/store/mode'

/**
 * init draw line
 * @param scene
 */
const useCreateLine = () => {
  const pointsRef = useRef<Float32Array>(new Float32Array(3))
  const geometryRef = useRef<LineGeometry | null>(null)
  const countRef = useRef<number>(0)
  const lineRef = useRef<Line2 | null>(null)
  const { scene } = useThree()
  const { drawline } = useModeStore(state => state)

  const initCreateLine = () => {
    const geometry = new LineGeometry()
    geometry.setPositions(pointsRef.current)
    const material = new LineMaterial({ color: 0x000000, linewidth: 0.005 })

    const line = new Line2(geometry, material)
    lineRef.current = line

    scene.add(line)
    geometry.attributes.position.needsUpdate = true

    return geometry
  }

  const pushPoint = (x: number, y: number, z: number) => {
    if (!drawline)
      return

    if (countRef.current === 0)
      pointsRef.current = new Float32Array([x, y, z])
    else
      pointsRef.current = new Float32Array([...pointsRef.current, x, y, z])

    countRef.current += 1

    if (geometryRef.current && lineRef.current) {
      scene.remove(lineRef.current)

      const geometry = new LineGeometry()
      geometry.setPositions(pointsRef.current)
      geometryRef.current = geometry

      const line = new Line2(geometry, lineRef.current.material as LineMaterial)
      lineRef.current = line
      scene.add(line)
    }
  }

  const destroyLine = () => {
    geometryRef.current = null
    countRef.current = 0
    pointsRef.current = new Float32Array(3)

    lineRef.current && scene.remove(lineRef.current)
    lineRef.current = null
  }

  useEffect(() => {
    if (drawline) {
      const setFunction = initCreateLine()
      geometryRef.current = setFunction
    }
    else {
      destroyLine()
    }
  }, [drawline])

  return pushPoint
}

export default useCreateLine
