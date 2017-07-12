<template>
  <transition name="move">
    <div class="detailWrapper" v-show="showDetail" ref="detailWrapper">
      <div class="foodDetail">
        <div class="back" @click="showDetail= !showDetail">
          <i class="icon-arrow_lift"></i>
        </div>
        <img :src="food.image" alt="seo" width="100%" height="425">
        <div class="info">
          <div class="title">{{food.name}}</div>
          <div class="desc">
            <span>月售{{food.sellCount}}</span>
            <span>好评率{{food.rating}}%</span>
          </div>
          <div class="price">￥{{food.price}}</div>
          <!--这里要给函数传递参数前面要加$-->
          <transition name="fade">
            <div class="shopCart" @click="add($event)" v-show="food.count===0||food.count==undefined">
              <div class="text">加入购物车</div>
            </div>
          </transition>
          <cartcontrol :val="food" ref="cartcontrol"></cartcontrol>
        </div>
        <div class="divider"></div>
        <div class="desc">
          <div class="title">商品介绍</div>
          <div class="content">{{food.info}}</div>
        </div>
        <div class="divider"></div>
        <div class="evaluation">
          <div class="title">商品评价</div>
          <div class="classify">
            <!--混合绑定class样式-->
            <span class="item" v-for="(item,index) in classify"
            :class="{'active': item.active, 'bad': index === 2, 'badActive': index === 2 && item.active}" @click="classifyClick(item)">{{item.name}}
            <span class="name">{{item.count}}</span></span>
          </div>
          <div class="switch">
            <span class="icon-check_circle" :class="{'on': flag}" @click="flag=!flag"></span>
            <span class="text">只看有内容的评价</span>
          </div>
          <div class="evel-list">
            <li class="evel" v-for="item in commentContent">
              <div class="userInfo">
                <div class="time">{{item.rateTime}}</div>
                <div class="user">
                  <span>item.username</span>
                  <span class="avatar">
                    <img :src="item.avatar" alt="seo" width="12" height="12">
                  </span>
                </div>
              </div>
              <div class="content">
                <span class="icon" :class="item.rateType?'icon-thumb_down':'icon-thumb_up'"></span>
                <span class="text">{{item.text}}</span>
              </div>
            </li>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  import cartcontrol from './cartcontrol.vue'
  import Scroll from 'better-scroll'
  export default {
    props: ['food'],
    data () {
      return {
        showDetail: false,
        classify: [
          {name: '全部', count: 0, active: true, comment: []},
          {name: '推荐', count: 0, active: false, comment: []},
          {name: '吐槽', count: 0, active: false, comment: []}
        ],
        con: [],
        flag: false
      }
    },
    mounted () {
    },
    methods: {
      foodShow () {
        this.showDetail = true
//      要等值传递进来才能foreach
        this.$nextTick(() => {
          this.con = this.food.ratings
          this.food.ratings.forEach(val => {
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
        })
        this.$nextTick(() => {
//        点击几次创建几次滚动，所以要阻止多次点击事件
          if (!this.cs) {
            this.cs = new Scroll(this.$refs['detailWrapper'], {
              click: true
            })
          } else {
            this.cs.refresh()
          }
        })
      },
//    按钮点击事件，把该按钮的样式改变，同时把按钮对应的内容添加到评论中
      classifyClick (item) {
        this.con = item.comment
        this.classify.forEach(val => {
          val.active = false
        })
        item.active = true
      },
      add (event) {
        this.$refs['cartcontrol'].addCart(event)
      },
      updatesc () {
        this.$nextTick(() => {
          this.cs.refresh()
        })
      }
    },
    components: {
      cartcontrol
    },
    computed: {
      commentContent () {
        let arr = []
//      先注册nextTick事件，等dom更新完再执行里面的回调
        this.updatesc()
        if (this.flag) {
          this.con.forEach(val => {
            if (val.text.length > 0) {
              arr.push(val)
            }
          })
          return arr
        } else {
          return this.con
        }
      }
    }
  }
</script>
