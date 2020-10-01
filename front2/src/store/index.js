import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import tasks from './tasks.js'
import plans from './plans.js'
import projects from './projects.js'
import { TYPES } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    mode: {},
    query: {},
    opened: {},
    title: TYPES.home.title
  },
  mutations: {
    /**
     * Sets the query item
     *
     * @param state
     * @param {object} input    opened item
     */
    setQuery: function(state, input) {
      state.query = input
    },
    /**
     * Sets the opened item
     *
     * @param state
     * @param {object} input    opened item
     */
    setOpened: function(state, input) {
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
      if (input.title) {
        state.title = input.title
      }
    },
    /**
     * Set title
     *
     * @param state
     * @param {string} input
     */
    title: function (state, input) {
      if (state.mode.title) return
      state.title = input
    }
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
