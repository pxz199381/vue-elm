<template>
  <div class="shopCart">
    <!--购物车滚动插件调用-->
    <div class="content" @click="scShop">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo active">
            <i class="icon-shopping_cart"></i>
          </div>
          <div v-show="totalPrice > 0" class="badge">{{totalCount}}</div>
        </div>
        <!--绑定class属性，active与后面的布尔值匹配-->
        <div :class="{'active': totalPrice}" class="price">￥{{totalPrice}}</div>
        <div v-show="totalPrice < 99" class="desc"></div>
      </div>
      <div class="content-right" :class="{'enough':totalPrice > minPrice}">
        <div class="pay">{{payDesc}}</div>
      </div>
    </div>
    <transition name="transHeight">
      <!--判断条件：1，在有商品的前提下，show为true或false决定显示与否；2，在没有商品的前提下，show强制设为false-->
      <div class="shopcart-list" v-show="showShop">
        <div class="list-header">
          <h1 class="title">购物车</h1>
          <span class="empty" @click="empty">清空</span>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food" v-for="item in foodCount">
              <span class="name">{{item.name}}</span>
              <div class="price">
                <span>￥{{item.price}}</span>
              </div>
              <div class="cartcontrol-wrapper">
                <cartcontrol :val="item"></cartcontrol>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
//  computed和methods的区别 计算属性是基于依赖进行缓存的，依赖改变则重新计算
// 而只要发生重新渲染，method调用总会执行该函数

  import cartcontrol from './cartcontrol.vue'
  import Scroll from 'better-scroll'
  export default {
    data () {
      return {
        show: false
      }
    },
    props: ['deliveryPrice', 'minPrice', 'foodCount'],
    computed: {
      totalPrice () {
        let sum = 0
        this.foodCount.forEach(val => {
          sum += val.count * val.price
        })
        return sum
      },
      totalCount () {
        let count = 0
        this.foodCount.forEach(val => {
          count += val.count
        })
        return count
      },
//      差多少起送
      payDesc () {
        if (this.totalPrice === 0) {
//            ${} ES规定拼接字符串的方法,并且要用反引号
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          return `还差${this.minPrice - this.totalPrice}起送`
        } else {
          return '去结算'
        }
      },
      showShop () {
        if (this.totalPrice === 0) {
          this.show = false
        }
        //      等待dom更新完使用滚动插件
//      插件会沿用上一次的高度
        this.$nextTick(() => {
//          判断是否是第一次调用sc，是的话则初始化，否则刷新数据
          if (!this.sc) {
            this.sc = new Scroll(this.$refs['listContent'], {
              click: true
            })
          } else {
//            强制重新计算高度
            this.sc.refresh()
          }
          console.log(this.$refs['listContent'].offsetHeight)
        })
        return this.show
      }
    },
    components: {
      cartcontrol
    },
    methods: {
      empty () {
        this.foodCount.forEach(val => {
          val.count = 0
        })
//      这里不设置flag则导致物品栏的flag一直为true,未点击购物栏（同时没有更新滚动条）物品栏就出现
        this.show = false
      },
      scShop () {
        if (this.totalPrice > 0) {
          this.show = !this.show
        }
      }
    }
  }
</script>
