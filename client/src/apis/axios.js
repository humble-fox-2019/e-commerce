import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://35.188.216.7'
});

export default axiosInstance;