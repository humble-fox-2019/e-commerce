// import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'
// axios.defaults.baseURL = `http://localhost:3000`
// Vue.use(VueAxios, axios)
// const myAxios = axios.create({
//     baseURL: 'http://localhost:3000'
// })
// Vue.prototype.$auth = myAxios
const myAxios = axios.create({
    baseURL: 'http://localhost:3000'
})
export default myAxios
