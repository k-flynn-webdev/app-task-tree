import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import CONSTANTS from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: CONSTANTS.MODES[0]
  },
  mutations: {
    /**
     * Set the current mode via index
     *
     * @param state
     * @param {number} input
     */
    mode: function (state, input) {
      if (input < 0 && input >= CONSTANTS.MODES.length) return
      Vue.set(state, 'mode', CONSTANTS.MODES[input] )
    }
  },
  actions: {
  },
  modules: {
    user
  }
})
