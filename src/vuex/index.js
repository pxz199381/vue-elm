import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import state from './state'
import mutations from './mutations'

// 在文件夹下多个js文件对应相应的功能
export default new Vuex.Store({
  state,
  mutations
})
