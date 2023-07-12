import { useState } from 'react'
import { Outlet } from '@umijs/max'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { ErrorFallback } from '@/components/ErrorFallback'

import './index.scss'
import '../../public/font/iconfont.css'

const EditorLayout = () => {
  const [hasError] = useState(false)

  return (
    <ErrorBoundary
      fallbackRender={ErrorFallback}
      >
      <div style={{ width: '100vw', height: '100vh' }}>
        { !hasError ? <Outlet/> : null}
      </div>
    </ErrorBoundary>
  )
}

export default EditorLayout
