import axios from 'axios'

const myAxios = axios.create({
  // baseURL: 'http://localhost:3000'
  // baseURL: 'http://api.grabah.guntoroyk.site'
  baseURL: 'https://grabah-store-server.herokuapp.com'
})
export default myAxios
