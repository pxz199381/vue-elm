// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 这里是主文件
import Vue from 'vue'
import App from './App'
// 引入的路径 没有 ./ /  直接些名字是找的node_modules目录下的文件
import router from './router'
// 访问vuex目录时，会访问目录下的index.js
import store from './vuex'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})

