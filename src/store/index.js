import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    savedUser:{} 
  },
  mutations: {
    saveUser: (state, saved)=>{
      state.savedUser = saved
    }
  },
  actions: {
  },
  modules: {
  }
})
