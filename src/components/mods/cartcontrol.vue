<template>
  <div class="cartcontrol">
    <transition name="fadeRotate">
      <!--停止冒泡.stop-->
      <div v-show="val.count>0" @click.stop="decreaseCart" class="cart-decrease">
        <span class="icon-remove_circle_outline inner"></span>
      </div>
    </transition>
    <div v-show="val.count>0" class="cart-count">{{val.count}}</div>
    <div @click.stop="addCart" class="cart-add">
      <i class="icon-add_circle"></i>
    </div>
  </div>
</template>
<script>
//  对象、数组在进行传值时，是引用状态，可以通过指针访问原内容
//  点击按钮会触发pc端和插件，两次，所以要禁用pc端的点击事件
  import Vue from 'vue'
  import {mapMutations, mapState} from 'vuex'
  export default {
    props: ['val'],
    methods: {
      ...mapMutations([
        'vxaddCart',
        'vxdecreaseCart'
      ]),
//      在点击事件阻止pc点击事件
      addCart (event) {
        if (!event._constructed) {
          return false
        }
        if (typeof this.val.count === 'undefined') {
//          this.$set() 局部的方法，必须要传值过来(传递给addCart作为参数)，不能直接在数据里添加，而全局可以直接添加
          Vue.set(this.val, 'count', 0)
          Vue.set(this.val, 'active', true)
        }
        this.val.count++
        if (this.val.active) {
          this.vxaddCart(this.val)
          this.val.active = false
        }
      },
      decreaseCart (event) {
        if (!event._constructed) {
          return false
        }
        this.val.count--
        if (this.val.count === 0) {
          this.vxdecreaseCart(this.val)
          this.val.active = true
        }
      }
    },
    computed: {
      ...mapState([
        'vxfood'
      ])
    }
  }
</script>
