import Axios from "axios"
export default Axios.create({
    baseURL: process.env.SERVER_URL || 'http://localhost:3000',
    timeout: 15000,
    headers: { 'token': localStorage.getItem('token') }
})