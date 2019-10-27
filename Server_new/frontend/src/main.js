// Import ES6 Promise
import 'es6-promise/auto'

// Import System requirements
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSession from 'vue-session'

import { sync } from 'vuex-router-sync'
import routes from './routes'
import store from './store'

// Import Helpers for filters
import { domain, count, prettyDate, pluralize } from './filters'

// Import Views - Top level
import AppView from './components/App.vue'

// Import Install and register helper items
Vue.filter('count', count)
Vue.filter('domain', domain)
Vue.filter('prettyDate', prettyDate)
Vue.filter('pluralize', pluralize)

// SweetAlert2
import VueSweetalert2 from 'vue-sweetalert2'
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674'
}
Vue.use(VueSweetalert2, options)

// Vue-moment
import moment from 'moment'
import VueMomentJS from 'vue-momentjs'
Vue.use(VueMomentJS, moment)

// Vue Router + Session
Vue.use(VueRouter)
Vue.use(VueSession)

// Caver-js
import Caver from 'caver-js'
// import contractInfo from './contractInfo'
Vue.use(Caver)
// const config = {
//   rpcURL: 'https://api.baobab.klaytn.net:8651/'
// }
// const cav = new Caver(config.rpcURL)
// const blotMainContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTMAIN_ABI, contractInfo.DEPLOYED_BLOTMAIN_ADDRESS)
// const blotUserContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTUSER_ABI, contractInfo.DEPLOYED_BLOTUSER_ADDRESS)
// const blotProjectContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTPROJECT_ABI, contractInfo.DEPLOYED_BLOTPROJECT_ADDRESS)
// const blotTokenContract = new cav.klay.Contract(contractInfo.DEPLOYED_BLOTTOKEN_ABI, contractInfo.DEPLOYED_BLOTTOKEN_ADDRESS)

// Routing logic
var router = new VueRouter({
  routes: routes,
  mode: 'history',
  linkExactActiveClass: 'active',
  scrollBehavior: function(to, from, savedPosition) {
    return savedPosition || { x: 0, y: 0 }
  }
})

// Some middleware to help us ensure the user is authenticated.
router.beforeEach((to, from, next) => {
  if (
    to.matched.some(record => record.meta.requiresAuth) &&
    (!router.app.$store.state.token || router.app.$store.state.token === 'null')
  ) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    window.console.log('Not authenticated')
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
})

sync(store, router)

// Check local storage to handle refreshes
if (window.localStorage) {
  var localUserString = window.localStorage.getItem('user') || 'null'
  var localUser = JSON.parse(localUserString)

  if (localUser && store.state.user !== localUser) {
    store.commit('SET_USER', localUser)
    store.commit('SET_TOKEN', window.localStorage.getItem('token'))
  }
}

// Start out app!
// eslint-disable-next-line no-new
new Vue({
  el: '#root',
  router: router,
  store: store,
  render: h => h(AppView)
})

// change this. demo
window.bugsnagClient = window.bugsnag('02fe1c2caaf5874c50b6ee19534f5932')
window.bugsnagClient.use(window.bugsnag__vue(Vue))
