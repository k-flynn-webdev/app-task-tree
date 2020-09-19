import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import { MODES } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: MODES[0]
  },
  mutations: {
    /**
     * Set the current mode via index
     *
     * @param state
     * @param {number} input
     */
    mode: function (state, input) {
      if (input < 0 && input >= MODES.length) return
      Vue.set(state, 'mode', MODES[input] )
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
