<template>
  <div id="app">
    <vheader :seller="datas.seller"></vheader>
    <div class="tab">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <!--datas传递的时间要比ajax完成的时间要快-->
    <!--通过$refs.rComponent.fun获取组件的方法-->
    <!--把加载过的组件缓存起来-->
    <keep-alive>
      <router-view :datas="datas" ref="rComponent"></router-view>
    </keep-alive>
  </div>
</template>

<script>
  import vheader from './components/mods/header.vue'
  import axios from 'axios'
  export default {
    data () {
      return {
        datas: {
          seller: {},
          goods: [],
          ratings: []
        }
      }
    },
//  mounted 为组件实例加载完成后，所以组件被缓存后不能进入mounted，要通过activated时期
//  一般为组件缓存，数据更新activated
    mounted () {
      axios.get('/static/data.json').then(res => {
        this.datas.seller = res.data.seller
        this.datas.goods = res.data.goods
        this.datas.ratings = res.data.ratings
//      this.$nextTick是在下次DOM更新循环结束时调用延迟回调函数
//      什么会引起DOM更新，Vue中响应式数据被修改
        this.$nextTick(() => {
          this.$refs['rComponent'].scroll()
        })
      })
    },
    name: 'app',
    components: {
      vheader
    }
  }
</script>

<style>
  #app .tab .tab-item .router-link-active {
    color: red;
  }
</style>
