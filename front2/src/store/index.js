import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import tasks from './tasks.js'
import plans from './plans.js'
import projects from './projects.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: {},
    query: {},
    opened: {},
  },
  mutations: {
    /**
     * Sets the query item
     *
     * @param state
     * @param {object} input    opened item
     */
    setQuery: function(state, input) {
      if (!input) {
        input = {}
      }
      state.query = input
    },
    /**
     * Sets the opened item
     *
     * @param state
     * @param {object} input    opened item
     */
    setOpened: function(state, input) {
      if (!input) {
        input = {}
      }
      state.opened = input
    },
    /**
     * Set the current mode via index
     *
     * @param state
     * @param {object} input
     */
    mode: function (state, input) {
      Vue.set(state, 'mode', input)
    },
  },
  actions: {
  },
  modules: {
    user,
    tasks,
    plans,
    projects
  }
})
