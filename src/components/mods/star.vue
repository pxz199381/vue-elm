<template>
  <div class="star" :class="icon">
    <span v-for="item in starShow" :class="item" class="star-item"></span>
  </div>
</template>
<script>
  export default {
    props: ['score', 'icon'],
    computed: {
      starShow () {
        let arr = []
        let integer = Math.floor(this.score)
        let point = (this.score - integer) >= 0.5
        for (let i = 0; i < integer; i++) {
          arr.push('on')
        }
        if (point) {
          arr.push('half')
        }
        while (arr.length < 5) {
          arr.push('off')
        }
        return arr
      }
    }
  }
</script>
