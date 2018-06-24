import Vue from 'vue'
import router from './router'
import VueSocketio from 'vue-socket.io'
require('./components')

Vue.use(VueSocketio, 'http://localhost:3000')

window.axios = require('axios')
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
Vue.prototype.$http = window.axios

require('./assets/css/estilos.css')

Vue.config.productionTip = false
new Vue({ // eslint-disable-line no-new
  el: '#app',
  router,
  template: '<App/>'
})
