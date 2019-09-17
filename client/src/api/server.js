import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://35.187.249.125/'
})

export default instance
