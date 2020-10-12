import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import tasks from './tasks.js'
import plans from './plans.js'
import projects from './projects.js'

const SORT_BY = 'sortBy'

Vue.use(Vuex)

function initSortBy () {
  const local = localStorage.getItem(SORT_BY)
  if (local === undefined || local === 'undefined' || local === null) {
    return null
  }

  return JSON.parse(local)
}

export default new Vuex.Store({
  state: {
    mode: {},
    query: {},
    opened: {},
    sortBY: null
  },
  mutations: {
    /**
     * Sets the query sortBy field
     *
     * @param state
     * @param {object} input    sort option { text: direction }
     */
    setSortBy: function(state, input) {
      if (!input) {
        input = null
      }
      state.sortBY = input
      localStorage.setItem(SORT_BY, input)
    },
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
