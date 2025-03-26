import { useSelector } from 'react-redux'
import LoadingSpinner from './LoadingSpinner'

const RootLayout = ({ children }) => {
  const { isLoading } = useSelector((state) => state.auth)

  if (isLoading) {
    return <LoadingSpinner />
  }

  return children
}

export default RootLayout