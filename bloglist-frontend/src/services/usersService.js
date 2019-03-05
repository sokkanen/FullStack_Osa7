import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = async () => {
  let tbl
  const request = await axios.get(baseUrl)
  tbl = request.data
  tbl.sort((a,b) => b.blogs.length - a.blogs.length)
  return tbl
}

export default { getAllUsers }