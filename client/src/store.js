'use strict'

import Vue from 'vue'

// Simple store to hold user data outside component scope
export default Vue.observable({
  email: '',
  id: '',
  isAdmin: null
})
