import axios from 'axios'
import { useState } from 'react'
import useField from './useField'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const token = useField('text')

  const setToken = ( newToken) => {
    token.value = `bearer ${newToken}`
  }

  const removeToken = () => {
    token.reset()
  }

  const getToken = () => {
    return token.value
  }

  const getAll = async () => {
    let tbl
    const request = await axios.get(baseUrl)
    tbl = request.data
    tbl.sort((a,b) => b.likes - a.likes)
    setResources(tbl)
  }
      
  const create = async (newObject) => {
    const config = {
      headers: { Authorization: token.value }
    }
      
    const response = await axios.post(baseUrl, newObject, config)
    const newAdded = resources.concat(response.data)
    setResources(newAdded)
  }

  const update = async (id, newObject) => {
    await axios.put(`${baseUrl}/${id}`, newObject)
  }
  
  const remove = async (id) => {
    const config = {
      headers: { Authorization: token.value },
      id: id
    }
    console.log(config)
    const res = await axios.delete(`${baseUrl}/${id}`, config)
    console.log(res)
    getAll()
  }

  const service = {
    create,
    setToken,
    getToken,
    removeToken,
    getAll,
    update,
    remove
  }

  return [
    resources, service
  ]
}

export default useResource