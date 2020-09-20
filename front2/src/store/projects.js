import Vue from 'vue'
import { PROJECTS } from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    current: null,
    projects: [],
  },
  mutations: {
    /**
     * Sets the current selected project
     *
     * @param state
     * @param {object} input    project to set
     */
    setCurrent: function(state, input) {
        state.current = input
    },
    /**
     * Sets the Projects
     *
     * @param state
     * @param {array} input   list of projects
     */
    setProjects: function (state, input) {
      Vue.set(state, 'projects', input)
    },
    /**
     * Add a Project
     *
     * @param state
     * @param {object} input   project
     */
    addProject: function (state, input) {
      state.projects.unshift(input)
    },
  },
  actions: {
    /**
     * Create a Project via the API
     *
     * @param context
     * @param {object} input
     * @return {Promise}
     */
    createProject: function (context, input) {
      return HTTP.post(PROJECTS.API.POST, input)
        .then(res => {
          context.commit('addProject',
            get(res, 'data.data'))
        })
    },
    /**
     * Get Projects via the API
     *
     * @param context
     * @param {object} input    input query
     * @return {Promise}
     */
    getProjects: function (context, input) {
      return HTTP.get(PROJECTS.API.POST, input)
      .then(res => {
        context.commit('setProjects',
          get(res, 'data.data'))
      })
    }
  }
}

/**
 * @typedef {object} Meta
 *
 * @property {date}     [created]     Date User was created
 * @property {date}     [updated]     Date Users details last changed
 * @property {date}     [login]       Date User logged in
 * @property {boolean}  [verified]    If User has verified email
 */

/**
 * @typedef {object} User
 *
 * @property {number}   [id]          Unique ID
 * @property {string}   name          Name
 * @property {string}   email         Email
 * @property {string}   [password]    (Only used on creation)
 * @property {string}   [role]        Role [anon | user | admin]
 * @property {Meta}     [meta]        User meta details
 */
