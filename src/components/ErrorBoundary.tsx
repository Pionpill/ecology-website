import { Component, ErrorInfo, ReactNode } from 'react'

type Props = {
  children: ReactNode
  fallback?: ReactNode
}

type State = {
  hasError: boolean
  error: Error | null
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
          <h1 className="text-4xl font-bold text-destructive">Something went wrong</h1>
          <p className="text-muted-foreground">{this.state.error?.message}</p>
          <button
            className="rounded-md bg-primary px-4 py-2 text-primary-foreground"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
