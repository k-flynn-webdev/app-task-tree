import Vue from 'vue'
import router from '../router'
import { PROJECT, TASK } from '../constants';
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  namespaced: true,
  state: {
    current: null,
    total: 0,
    items: [],
    loading: false
  },
  mutations: {
    setTotal: function (state, input) {
      state.total = input
    },
    setLoading: function (state, input) {
      state.loading = input
    },
    /**
     * Sets the current selected Task
     *
     * @param state
     * @param {object} input    task to set
     */
    setCurrent: function(state, input) {
        state.current = input
    },
    /**
     * Sets the Tasks
     *
     * @param state
     * @param {array} input   list of tasks
     */
    set: function (state, input) {
      Vue.set(state, 'items', input)
    },
    /**
     * Add a Task
     *
     * @param state
     * @param {object} input   project
     */
    post: function (state, input) {
      state.items.unshift(input)
    },
    /**
     * Patch a Task via the id
     *
     * @param state
     * @param {object} input   task
     */
    patch: function (state, input) {
      for (let i = 0; i < state.items.length; i++) {
        if (state.items[i].id === input.id) {
          Vue.set(state.items, i, input)
          return
        }
      }
    }
  },
  actions: {
    /**
     * Create a Task via the API
     *
     * @param context
     * @param {object} input
     * @return {Promise}
     */
    post: function (context, input) {
      context.commit('setLoading', true)
      return HTTP.post(TASK.API.POST, input)
        .then(res => {
          if (get(router.currentRoute, 'query.page')) return

          context.commit('post',
            get(res, 'data.data'))
        })
        .finally(() => context.commit('setLoading', false))
    },
    /**
     * Patch a Task via the API
     *
     * @param context
     * @param {object} input
     * @return {Promise}
     */
    patch: function (context, input) {
      context.commit('setLoading', true)
      return HTTP.patch(TASK.API.PATCH + '/' + input.id, input)
      .then(res => {
        context.commit('patch',
          get(res, 'data.data'))
      })
      .finally(() => context.commit('setLoading', false))
    },
    /**
     * Remove a Task via the API
     *
     * @param context
     * @param {number} id
     * @return {Promise}
     */
    remove: function (context, id) {
      context.commit('setLoading', true)
      return HTTP.remove(TASK.API.DELETE + '/' + id)
      .then(() => {
        context.dispatch('get', router.currentRoute)
      })
      .finally(() => context.commit('setLoading', false))
    },
    /**
     * Get Tasks via the API
     *
     * @param context
     * @param {object} input    input query
     * @return {Promise}
     */
    get: function (context, input) {
      context.commit('setLoading', true)
      return HTTP.get(TASK.API.GET, { params: input.query })
      .then(res => {
        context.commit('set',
          get(res, 'data.data'))
        context.commit('setTotal',
          get(res, 'data.total'))
      })
      .finally(() => context.commit('setLoading', false))
    },
    /**
     * Get A Task via the API
     *
     * @param context
     * @param {object} input    input query
     * @return {Promise}
     */
    getById: function (context, input) {
      context.commit('setLoading', true)
      return HTTP.get(TASK.API.GET + '/' + input.id)
      .finally(() => context.commit('setLoading', false))
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
