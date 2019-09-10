// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
/* 최상위 객체(app)정의 - 내부에서 라우팅에 따라 다른 결과 표시 */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
