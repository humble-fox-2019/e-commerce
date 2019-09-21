import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
// import plugin
import VueToastr from 'vue-toastr'
// use plugin
Vue.use(VueToastr, {
  /* OverWrite Plugin Options if you need */
})

Vue.config.productionTip = false

new Vue({
  router,
  vuetify,
  render: h => h(App),
  created () {
    // this.$toastr.Add({
    //   name: '', // this is give you ability to use removeByName method
    //   title: 'Welcome to Tomoe Store', // Toast Title
    //   msg: 'Hi, We are selling japan product', // Toast Message
    //   clickClose: false, // Click Close Disable
    //   timeout: 2000, // Remember defaultTimeout is 5 sec.(5000) in this case the toast won't close automatically
    //   // progressBarValue: 50, // Manually update progress bar value later; null (not 0) is default
    //   position: 'toast-top-center', // Toast Position.
    //   type: 'info', // Toast type,
    //   preventDuplicates: true, // Default is false,
    //   style: { backgroundColor: '#9b239b', width: '550px', height: '100px', 'font-size': '21pt' } // bind inline style to toast  (check [Vue doc](https://vuejs.org/v2/guide/class-and-style.html#Binding-Inline-Styles) for more examples)
    // })
  }
}).$mount('#app')
