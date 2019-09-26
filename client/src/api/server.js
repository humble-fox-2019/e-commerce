import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://35.187.247.146'
})

export default instance
