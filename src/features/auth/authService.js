import axios from 'axios'

const API_URL = '/api/auth'

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password })
  return response.data
}

const checkAuth = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    throw new Error('No token found')
  }
  
  const response = await axios.get(`${API_URL}/check`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  return response.data
}

export default {
  login,
  checkAuth
}