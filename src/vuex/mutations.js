// 最好不要直接在模板文件里操控vuex里的数据。所以在这里即需要定义函数的地方，操控vuex的数据
export default {
  // 默认第一个参数就是vuex里所定义的数据
  vxaddCart (state, val) {
    state.vxfood.push(val)
  },
  vxdecreaseCart (state, val) {
    state.vxfood.forEach((item, index) => {
      if (item.name === val.name) {
        state.vxfood.splice(index, 1)
      }
    })
  }
}
