import Vue from 'vue'
import Vuex from 'vuex'
import user from './user.js'
import toasts from './toasts.js'
import tasks from './tasks.js'
import projects from './projects.js'
import status from '../constants/status'
import helpers from '../services/Helpers'
import general from '../constants/general'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    ready: false,
    status: status.CLEAR
  },
  getters: {
    /**
     * Returns current status
     *
     * @param state
     * @returns {object}
     */
    status: (state) => state.status,
    /**
     * Returns the app finished loading
     *
     * @param state
     * @returns {object}
     */
    ready: (state) => state.ready
  },
  mutations: {
    /**
     * Sets current app ready
     *
     * @param           state
     * @param {boolean} input   app status
     * @returns {boolean}
     */
    ready: (state, input) => {
      state.ready = input
    },
    /**
     * Sets current app status
     *
     * @param           state
     * @param {boolean} input   app status
     * @returns {boolean}
     */
    status: (state, input) => {
      state.status = input
      if (input !== status.CLEAR) {
        helpers.timeDelay(() => {
          state.status = status.CLEAR
        }, general.DELAY_SUCCESS * 3)
      }
    }
  },
  actions: {
  },
  modules: {
    toasts,
    user,
    tasks,
    projects
  }
})
