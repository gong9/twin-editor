import ReactDOM from 'react-dom/client'
import type { FallbackProps } from './ErrorBoundary'

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <div role="alert">
      <p>出错啦</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>,
  )
}
