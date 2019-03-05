import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

  const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

  const removeToken = () => {
    token = ''
  }

  const getToken = () => {
    return token
  }

  const getAll = async () => {
    let tbl
    const request = await axios.get(baseUrl)
    tbl = request.data
    tbl.sort((a,b) => b.likes - a.likes)
    return tbl
  }
      
  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token }
    }
      
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  const update = async (id) => {
    const res = await axios.put(`${baseUrl}/${id}`)
    return res.data
  }
  
  const remove = async (id) => {
    const config = {
      headers: { Authorization: token },
      id: id
    }
    console.log(config)
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    console.log(res)
    getAll()
  }

export default { setToken, removeToken, getToken, getAll, create, update, remove }