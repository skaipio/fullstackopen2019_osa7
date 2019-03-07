import axios from 'axios'
import loginService from './login'

const baseUrl = '/api/users'

const headersWithToken = () => ({
  Authorization: `Bearer ${loginService.getUser().token}`
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

export default { getAll }
