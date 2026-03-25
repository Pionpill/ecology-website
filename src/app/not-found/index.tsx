import { FC } from 'react'
import { useNavigate } from 'react-router'
import { Button } from '@/components/ui/button'

const NotFound: FC = () => {
  const navigate = useNavigate()

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="text-8xl font-bold text-muted-foreground">404</h1>
      <p className="text-xl font-semibold">Page Not Found</p>
      <p className="text-muted-foreground">The page you are looking for does not exist.</p>
      <Button onClick={() => navigate('/')}>Back to Home</Button>
    </div>
  )
}

export default NotFound
