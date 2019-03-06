import axios from 'axios'
const baseUrl = '/api/login'

let userToken = null

const login = async (username, password) => {
  const response = await axios.post(baseUrl, {
    username, password
  })
  return response.data
}

const getUser = () => {
  return userToken
}

const setUser = (token) => {
  userToken = token
}

export default { login, getUser, setUser }