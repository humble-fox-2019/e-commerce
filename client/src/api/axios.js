import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000'
});

// server 
// const axiosInstance = axios.create({
//     baseURL: 'http://35.187.241.230'
// });
export default axiosInstance

