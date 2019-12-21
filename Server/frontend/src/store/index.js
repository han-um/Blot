import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import actions from './actions'
import mutations from './mutations'

// Vuex 등록
Vue.use(Vuex)

export default new Vuex.Store({
  // 각 파일에서 불러옴
  state, // 변수
  actions, // ???
  mutations // 메소드(변수를 조작하는 함수)
})
