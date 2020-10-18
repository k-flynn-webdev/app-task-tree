import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import tasks from './tasks.js'
import plans from './plans.js'
import projects from './projects.js'
import { APP_VARS } from '../constants';

const SORT_TYPE = 'sortType'
const SORT_DIRECTION = 'sortDirection'

Vue.use(Vuex)

function initSort () {
  const sortType = localStorage.getItem(SORT_TYPE) ||
    APP_VARS.sort.types[0].value
  const sortDirection = localStorage.getItem(SORT_DIRECTION) ||
    APP_VARS.sort.direction[0].value

  return {
    type: sortType,
    direction: sortDirection
  }
}

export default new Vuex.Store({
  state: {
    mode: {},
    query: {},
    opened: {},
    sort: initSort()
  },
  mutations: {
    /**
     * Sets the query sortType field
     *
     * @param state
     * @param {object} input    sort option { text: direction }
     */
    setSortType: function(state, input) {
      if (!input) {
        input = null
      }

      Vue.set(state.sort, 'type', input)
      localStorage.setItem(SORT_TYPE, input)
    },
    /**
     * Sets the query sortDirection field
     *
     * @param state
     * @param {object} input    sort option { text: direction }
     */
    setSortDirection: function(state, input) {
      if (!input) {
        input = null
      }

      Vue.set(state.sort, 'direction', input)
      localStorage.setItem(SORT_DIRECTION, input)
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
  getters: {
    /**
     * Returns a sort object to return to the API
     *
     * @param state
     * @param getters
     * @return {{$sort: {}}}
     */
    getSortObj: (state, getters) => {
      const srtType = state.sort.type
      const srtDirection = state.sort.direction

      return {
        '$sort': {
          [srtType]: srtDirection
        }
      }
    }
  },
  modules: {
    user,
    tasks,
    plans,
    projects
  }
})
