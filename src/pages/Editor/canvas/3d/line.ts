import type { Scene } from 'three'
import { Line2, LineGeometry, LineMaterial } from 'three-stdlib'

/**
 * init draw line
 * @param scene
 */
export const createLine = (scene: Scene) => {
  const geometry = new LineGeometry()
  const material = new LineMaterial({ color: 0x0000FF })

  const line = new Line2(geometry, material)
  scene.add(line)

  return geometry.setPositions
}
