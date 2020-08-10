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
    /**
     * Status of the app ready state
     * @returns {boolean}
     */
    ready: false,
    /**
     * Status of the app, eg success , error or loading/waiting on a API
     * @returns {string}
     */
    status: status.CLEAR
  },
  getters: {
  },
  mutations: {
    /**
     * Sets current app ready
     *
     * @param           state
     * @param {boolean} input   app status
     */
    ready: (state, input) => {
      state.ready = input
    },
    /**
     * Sets current app loading bar status
     *
     * @param           state
     * @param {string}  input   app status [WAITING,SUCCESS,ERROR]
     */
    status: (state, input) => {
      state.status = input
      if (input !== status.CLEAR) {
        helpers.timeDelay(() => {
          state.status = status.CLEAR
        }, general.DELAY_SUCCESS * 1.1)
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
