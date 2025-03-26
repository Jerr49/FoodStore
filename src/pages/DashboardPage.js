import { useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const DashboardPage = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Welcome, {user?.name}!
      </Typography>
      <Typography paragraph>
        This is your protected dashboard.
      </Typography>
      <Button variant="contained" color="error" onClick={handleLogout}>
        Logout
      </Button>
    </Container>
  )
}

export default DashboardPage