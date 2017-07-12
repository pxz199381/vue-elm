<template>
  <div class="seller-wrapper" ref="sellerWrapper">
    <div class="seller-content">
      <div class="info">
        <div class="title">
          <div class="text">{{datas.seller.name}}</div>
          <div class="star-wrapper">
            <star :score="datas.sumScore" :icon="normalSize"></star>
            <span class="rate-count">({{datas.seller.ratingCount}})</span>
            <span class="sell-count">月售{{datas.seller.sellCount}}单</span>
          </div>
          <div class="collect">
            <span class="icon-favorite" :class="{'active': flag}" @click="flag = !flag"></span>
            <span class="text" v-html="showFlag()"></span>
          </div>
        </div>
        <div class="remark">
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="num">{{datas.seller.minPrice}}元</span>
            </div>
          </div>
          <div class="block">
            <h2>商家配送</h2>
            <div class="content">
              <span class="num">{{datas.seller.deliveryPrice}}元</span>
            </div>
          </div>
          <div class="block">
            <h2>起送价</h2>
            <div class="content">
              <span class="num">{{datas.seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>

      </div>
      <div class="divider"></div>
      <div class="activities">
        <div class="bulletin">
          <h1>公告与活动</h1>
          <div class="content">{{datas.seller.bulletin}}</div>
        </div>
      </div>
      <div class="supports">
        <ul>
          <li class="item" v-for="item in datas.seller.supports">
            <span class="iconMap" :class="icon[item.type]"></span>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <div class="divider"></div>
      <div class="seller-imgs">
        <h1>商家实景</h1>
        <div class="img-wrapper">
          <div>
            <img :src="item" width="120" height="90" v-for="item in datas.seller.pics">
          </div>
        </div>
      </div>
      <div class="divider"></div>
      <div class="seller-info">
        <h1>商家信息</h1>
        <ul class="info-list">
          <li class="info" v-for="item in datas.seller.infos">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  import star from './mods/star.vue'
  import icon from './mods/icon.js'
  import Scroll from 'better-scroll'
  export default {
    props: ['datas'],
    data () {
      return {
        normalSize: 'star-36',
        flag: false,
//      要在这里引入数组
        icon: icon
      }
    },
    mounted () {
        /* eslint-disable no-new */
      new Scroll(this.$refs['sellerWrapper'], {
        click: true
      })
    },
    methods: {
      showFlag () {
        let show = ''
        if (this.flag) {
          show = '已收藏'
        } else {
          show = '收藏'
        }
        return show
      }
    },
    components: {
      star
    }
  }
</script>
