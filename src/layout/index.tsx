import { Outlet } from '@umijs/max'

const EditorLayout = () => {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Outlet/>
    </div>
  )
}

export default EditorLayout
