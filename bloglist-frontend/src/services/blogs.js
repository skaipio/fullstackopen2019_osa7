import axios from 'axios'
import loginService from './login'
const baseUrl = '/api/blogs'

const headersWithToken = () => ({
  Authorization: `Bearer ${loginService.getUser().token}`
})

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async blog => {
  const response = await axios.post(baseUrl, blog, {
    headers: headersWithToken()
  })
  return response.data
}

const update = async (blog, id) => {
  const blogToSend = {
    ...blog,
    user: blog.user ? blog.user.id : undefined
  }
  const response = await axios.put(`${baseUrl}/${id}`, blogToSend)
  return response.data
}

const remove = async id => {
  return await axios.delete(`${baseUrl}/${id}`, {
    headers: headersWithToken()
  })
}

const postCommentToBlog = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    comment
  })
  return response.data
}

export default { create, getAll, remove, update, postCommentToBlog }
