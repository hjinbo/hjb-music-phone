import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    currentSong: {}
  },
  mutations: { //  这里相当于Vue实例中的methods，用于定义方法 所有的方法都过来拿
    getCurrentSong (state) { // state是个形参 是state对象里面的数据都可以拿到 不通过this来拿
      return state.currentSong
    },
    setCurrentSong (state, currentSong) {
      state.currentSong = currentSong
    }
  },
  getters: {
  },
  actions: {
    getCurrentSongFun (context) {
      context.commit('getCurrentSong')
    },
    setCurrentSongFun (context, currentSong) {
      context.commit('setCurrentSong', currentSong)
    }
  }
})

export default store
