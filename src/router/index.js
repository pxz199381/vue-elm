import Vue from 'vue'
import Router from 'vue-router'
import goods from '../components/goods.vue'
import ratings from '../components/ratings.vue'
import seller from '../components/seller.vue'
// @是webpack规定的 @代表src目录
// 后缀名写不写都可以
// 机制 如果没有后缀名的话 会自动去寻找Hello.vue  Hello.js

Vue.use(Router)
export default new Router({
  routes: [
    {path: '/goods', component: goods},
    {path: '/ratings', component: ratings},
    {path: '/seller', component: seller}
  ]
})
