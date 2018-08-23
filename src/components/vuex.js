import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
var store = new Vuex.Store({
  state: {
    moduleTitle: [
      {show: true, index: 0},
      {show: false, index: 1},
      {show: false, index: 2},
      {show: false, index: 3},
      {show: false, index: 4},
      {show: false, index: 5},
      {show: false, index: 6},
      {show: false, index: 7},
      {show: false, index: 8},
      {show: false, index: 9}
    ],
    symbol: 0
  },
  mutations: {
  },
  getters: {
  },
  actions: {
  }
})
export default store
