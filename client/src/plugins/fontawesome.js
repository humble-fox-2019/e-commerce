import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPlus, faMinus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faPlus)
library.add(faMinus)
library.add(faTrashAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)
