import Vue from 'vue'
import router from '../router'
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
    /**
     * Patch a Project via the id
     *
     * @param state
     * @param {object} input   project
     */
    patchProject: function (state, input) {
      for (let i = 0; i < state.projects.length; i++) {
        if (state.projects[i].id === input.id) {
          Vue.set(state.projects, i, input)
          return
        }
      }
    }
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
          if (get(router.currentRoute, 'query.page')) return

          context.commit('addProject',
            get(res, 'data.data'))
        })
    },
    /**
     * Patch a Project via the API
     *
     * @param context
     * @param {object} input
     * @return {Promise}
     */
    patchProject: function (context, input) {
      return HTTP.patch(PROJECTS.API.PATCH + '/' + input.id,
        { value: input.value })
      .then(res => {
        context.commit('patchProject',
          get(res, 'data.data'))
      })
    },
    /**
     * Remove a Project via the API
     *
     * @param context
     * @param {number} id
     * @return {Promise}
     */
    removeProject: function (context, id) {
      return HTTP.remove(PROJECTS.API.DELETE + '/' + id)
      .then(() => {
        context.dispatch('getProjects', router.currentRoute)
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
      return HTTP.get(PROJECTS.API.POST, { params: input.query })
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
