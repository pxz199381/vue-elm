<template>
  <div class="ratings">
    <div class="ratingsWrapper" ref="ratingsWrapper">
      <div class="ratings-content">
        <div class="info">
          <div class="mark">
            <div class="num">{{comScore}}</div>
            <div class="text">综合评分</div>
            <div class="contrast">高于周边商家{{datas.seller.rankRate}}%</div>
          </div>
          <div class="stars">
            <div class="serviceScore">
              <span class="text">服务态度</span>
              <star :score="datas.seller.serviceScore" :icon="normalSize"></star>
              <span class="num">{{datas.seller.serviceScore}}</span>
            </div>
            <div class="foodScore">
              <span class="text">食品评分</span>
              <star :score="datas.seller.foodScore" :icon="normalSize"></star>
              <span class="num">{{datas.seller.foodScore}}</span>
            </div>
            <div class="deliveryTime">
              <span class="text">送达时间</span>
              <span class="time">{{datas.seller.deliveryTime}}分钟</span>
            </div>
          </div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="classify">
            <span class="item" v-for="(item,index) in classify"
                  :class="{'active': item.active, 'bad': index === 2, 'badActive': index === 2 && item.active}"
            @click="classifyClick(item)">
              {{item.name}}
              <span class="count">{{item.count}}</span>
            </span>
          </div>
          <div class="switch">
            <span class="icon-check_circle" @click="flag = !flag" :class="{'on': flag}"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <ul>
              <li class="evel" v-for="item in contentOnly">
                <div class="avatar">
                  <img :src="item.avatar" alt="seo" width="28" height="28">
                </div>
                <div class="content">
                  <div class="user">
                    <span class="name">{{item.username}}</span>
                    <span class="rateTime">{{item.rateTime}}</span>
                  </div>
                  <div class="star-wrapper">
                    <star :score="item.score" :icon="smallSize"></star>
                    <!--通过管道符将数据过滤-->
                    <span class="deliveryTime">{{item.deliveryTime|unit}}分钟送达</span>
                  </div>
                  <div class="text">{{item.text}}</div>
                  <div class="recommend">
                    <span class="icon icon-thumb_up" v-show="item.recommend.length"></span>
                    <span class="dish" v-for="val in item.recommend">{{val}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import star from './mods/star.vue'
  import Vue from 'vue'
  import Scroll from 'better-scroll'
  export default {
    props: ['datas', 'sum'],
    data () {
      return {
        classify: [
          {name: '全部', count: 0, active: true, comment: []},
          {name: '推荐', count: 0, active: false, comment: []},
          {name: '吐槽', count: 0, active: false, comment: []}
        ],
        flag: true,
        con: [],
        smallSize: 'star-24',
        normalSize: 'star-36'
      }
    },
    mounted () {
      this.con = this.datas.ratings
      this.datas.ratings.forEach(val => {
        this.classify[0].count++
        this.classify[0].comment.push(val)
        if (val.rateType) {
          this.classify[2].count++
          this.classify[2].comment.push(val)
        } else {
          this.classify[1].count++
          this.classify[1].comment.push(val)
        }
      })
      this.$nextTick(() => {
        this.sc = new Scroll(this.$refs['ratingsWrapper'], {
          click: true
        })
      })
    },
    filters: {
      unit (val) {
        if (isNaN(val) || val.length === 0) {
          val = 0
        }
        return val
      }
    },
    computed: {
      comScore () {
        let sum = 0
        sum = (this.datas.seller.foodScore + this.datas.seller.serviceScore) / 2
        sum = sum.toFixed(1)
        Vue.set(this.datas, 'sumScore', sum)
        return sum
      },
      contentOnly () {
        let arr = []
        this.updateSc()
        if (!this.flag) {
          this.con.forEach(val => {
            if (val.text.length) {
              arr.push(val)
            }
          })
          return arr
        } else {
          return this.con
        }
      }
    },
    methods: {
      classifyClick (item) {
        this.classify.forEach(val => {
          val.active = false
        })
        item.active = true
        this.con = item.comment
      },
      updateSc () {
        this.$nextTick(() => {
          this.sc.refresh()
        })
      }
    },
    components: {
      star
    }
  }
</script>
