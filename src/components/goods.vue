<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="item in datas.goods" class="menu-item">
          <span class="text">
            <span v-show="item.type>0" class="iconMap" :class="icon[item.type]"></span>
            {{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!--ul使用滚动条，需要把其父元素绑定，绑定到下面scroll的括号内-->
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="item in datas.goods" class="food-list foods-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <!--通过点击事件把点击的商品信息传递到子组件里-->
            <li v-for="val in item.foods" class="food-item" @click="showDetail(val)">
              <div class="icon">
                <img :src="val.icon" alt="seo" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{val.name}}</h2>
                <p class="description">{{val.description}}</p>
                <div class="sell-info">
                  <span class="sellCount">月售{{val.sellCount}}份</span>
                  <span class="rating">好评率{{val.rating}}</span>
                  <div class="price">
                    <span class="newPrice">
                      <span class="unit">￥{{val.price}}</span>
                    </span>
                  </div>
                  <!--在按钮去点击事件会冒泡到父级-->
                  <div class="cartcontrol-wrapper">
                     <!--加减按钮区-->
                    <cartcontrol :val="val"></cartcontrol>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shopcart :foodCount="foodCount" :deliveryPrice="datas.seller.deliveryPrice" :minPrice="datas.seller.minPrice"></shopcart>
    <foodDetail ref="foodDetail" :food="food"></foodDetail>
  </div>
</template>
<script>
//  使用new scroll的时候要赋值，或者引入注释eslint-disable no-new
//  使用new时，后面的首字母要大写
//  使用scroll插件时，要先渲染好， this.$nextTick()，代表dom渲染完成后执行
//  dom更新完，new scroll（） ajax获得数据 dom又更新一遍，所以插件要在ajax获取数据之后再new
//  上拉刷新，可以通过判断最上方的元素距离最上方多少像素时发送ajax请求
//  当手机模式下，只要使用滚动插件，点击事件都会失效。解决方法在new scroll里加默认点击为TRUE
  import icon from './mods/icon'
  import Scroll from 'better-scroll'
  import shopcart from './mods/shopcart.vue'
  import cartcontrol from './mods/cartcontrol.vue'
  import foodDetail from './mods/foodDetail.vue'
  export default{
    props: ['datas'],
    data () {
      return {
        icon: icon,
        food: {
        }
      }
    },
    mounted () {
    },
    methods: {
      scroll () {
        /* eslint-disable no-new */
        new Scroll(this.$refs['foodsWrapper'], {
          click: true
        })
        new Scroll(this.$refs['menuWrapper'], {
          click: true
        })
      },
      showDetail (value) {
//      不直接让子组件的showDetail值为真，而是调用子组件的方法
        this.$refs['foodDetail'].foodShow()
        this.food = value
      }
    },
    components: {
      shopcart,
      cartcontrol,
      foodDetail
    },
    computed: {
      foodCount () {
        let arr = []
//        两次循环遍历goods对象，判断goods.goods.count不为0的项，并把该项的数据返回出去
        this.datas.goods.forEach(fVal => {
          fVal.foods.forEach(sVal => {
            if (sVal.count > 0) {
              arr.push(sVal)
            }
          })
        })
        return arr
      }
    }
  }
</script>
