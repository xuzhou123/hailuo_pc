import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    activeNavCode: 'all'
  },
  getters: {
    activeNavCode(state) {
      return state.activeNavCode;
    }
  },
  mutations: {
    SET_ACTIVENAVCODE(state, Payload) {
      state.activeNavCode = Payload;
    }
  },
  actions: {
    setActiveNavCode({commit}, Payload) {
      commit('SET_ACTIVENAVCODE',Payload);
    }
  },
  modules: {
  }
})
