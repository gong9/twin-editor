import { useEffect, useRef } from 'react'
import { useThree } from '@react-three/fiber'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'
import { BufferAttribute, BufferGeometry, Points, PointsMaterial, Vector3 } from 'three'

import useModeStore from '@/store/mode'
import { createBoxGeometryByPoints } from '@/utils/lineDerivation'

/**
 * init draw line
 * @param scene
 */
const useCreateLine = () => {
  const pointsRef = useRef<Float32Array>(new Float32Array(3))
  const pointsArrayRef = useRef<Vector3[]>([])
  const geometryRef = useRef<LineGeometry | null>(null)
  const pointRef = useRef<Points | null>(null)
  const countRef = useRef<number>(0)
  const lineRef = useRef<Line2 | null>(null)
  const isHasTryPointRef = useRef<boolean>(false)
  const { scene } = useThree()
  const { drawline } = useModeStore(state => state)

  const initCreateLine = () => {
    const geometry = new LineGeometry()
    geometry.setPositions(pointsRef.current)
    const material = new LineMaterial({ color: 0x000000, linewidth: 0.001 })

    const line = new Line2(geometry, material)
    lineRef.current = line

    scene.add(line)
    geometry.attributes.position.needsUpdate = true

    return geometry
  }

  /**
   * line first point helper show
   * @param x
   * @param y
   * @param z
   */
  const drawPoint = (x: number, y: number, z: number) => {
    const geo = new BufferGeometry()
    const vertices = new Float32Array([x, y, z])
    geo.setAttribute('position', new BufferAttribute(vertices, 3))

    const material = new PointsMaterial({ color: 0x000000, size: 0.1 })
    const point = new Points(geo, material)

    pointRef.current = point
    scene.add(point)
  }

  const updateDrawLine = () => {
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

  const pushPoint = (x: number, y: number, z: number) => {
    if (!drawline)
      return

    !isHasTryPointRef.current && pointsArrayRef.current.push(new Vector3(x, y, z))

    if (countRef.current === 0) {
      pointsRef.current = new Float32Array([x, y, z])
      drawPoint(x, y, z)
    }

    else {
      !isHasTryPointRef.current && (pointsRef.current = new Float32Array([...pointsRef.current, x, y, z]))
    }

    countRef.current += 1

    if (countRef.current >= 2) {
      const box = createBoxGeometryByPoints(pointsArrayRef.current[countRef.current - 2], pointsArrayRef.current[countRef.current - 1])
      scene.add(box)
    }

    !isHasTryPointRef.current && updateDrawLine()
    isHasTryPointRef.current = false
  }

  /**
   * handle example mouse move
   * @param x
   * @param y
   * @param z
   * @returns
   */
  const tryPushPoint = (x: number, y: number, z: number) => {
    if (!drawline || !countRef.current)
      return

    if (isHasTryPointRef.current) {
      pointsArrayRef.current.pop()
      pointsRef.current = new Float32Array([...pointsRef.current.slice(0, -3)])
      isHasTryPointRef.current = false
    }

    pointsArrayRef.current.push(new Vector3(x, y, z))
    pointsRef.current = new Float32Array([...pointsRef.current, x, y, z])

    isHasTryPointRef.current = true

    updateDrawLine()
  }

  const destroyLine = () => {
    geometryRef.current = null
    countRef.current = 0
    pointsRef.current = new Float32Array(3)

    if (lineRef.current) {
      scene.remove(lineRef.current)
      lineRef.current.geometry.dispose()
      lineRef.current.material.dispose()
      lineRef.current = null
    }

    if (pointRef.current)
      scene.remove(pointRef.current)
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

  return [pushPoint, tryPushPoint]
}

export default useCreateLine
