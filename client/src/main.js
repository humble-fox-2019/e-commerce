import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import VueSweetalert2 from 'vue-sweetalert2'
import VueToastr from 'vue-toastr'

Vue.use(VueSweetalert2)
Vue.use(VueToastr)

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: (h) => h(App),
  created () {
    this.$toastr.Add({
      name: '', // this is give you ability to use removeByName method
      title: 'Welcome to Tomoe Store', // Toast Title
      msg: 'Hi, We are selling japan product', // Toast Message
      clickClose: false, // Click Close Disable
      timeout: 2000, // Remember defaultTimeout is 5 sec.(5000) in this case the toast won't close automatically
      position: 'toast-top-center', // Toast Position.
      type: 'info', // Toast type,
      preventDuplicates: true, // Default is false,
      style: { backgroundColor: '#9b239b', width: '550px', height: '100px', 'font-size': '21pt' } // bind inline style to toast  (check [Vue doc](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for more examples)
    })
  }
}).$mount('#app')
