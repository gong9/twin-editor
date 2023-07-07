import ReactDOM from 'react-dom/client'
import type { FallbackProps } from './ErrorBoundary'

/**
 * todo 样式需要完善
 * @param param0
 */
export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div role="alert">
      <p>出错啦</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>,
  )
}
