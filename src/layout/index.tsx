import { useState } from 'react'
import { Outlet } from '@umijs/max'
import { ConfigProvider } from 'antd'
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
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#00b96b',
          },
          components: {
            Collapse: {
              colorBorder: '#444',
            },
          },
        }}>
        <div style={{ width: '100vw', height: '100vh' }}>
          { !hasError ? <Outlet/> : null}
        </div>
      </ConfigProvider>
    </ErrorBoundary>
  )
}

export default EditorLayout
