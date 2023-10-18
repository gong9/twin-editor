import { OrthographicCamera, PerspectiveCamera } from 'three'

const createPerspectiveCamera = (width: number, height: number) => {
  const camera = new PerspectiveCamera(70, width / height, 1, 1000)

  camera.position.set(30, 30, 0)
  return camera
}

// notes: now not use this function
const createOrthographicCamera = (left?: number, right?: number, top?: number, bottom?: number) => {
  const camera = new OrthographicCamera(-10, 10, 10, -10, 1, 1000)

  camera.position.set(5, 5, 0)
  return camera
}

export const getMainCamera = (getMainCamera: React.RefObject<HTMLDivElement>, angleOfView: '2d' | '3d') => {
  if (getMainCamera.current) {
    const { width, height } = getMainCamera.current.getBoundingClientRect()

    if (angleOfView === '3d')
      return createPerspectiveCamera(width, height)

    else
      createOrthographicCamera()
  }
}
