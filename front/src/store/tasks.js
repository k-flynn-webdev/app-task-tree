import Vue from 'vue'
import router from '../router'
import { TASK } from '../constants';
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'
import initItemState from './funcs/initItemState';

const mutations = {
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
}
const actions = {
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

export default {
  namespaced: true,
  state: initItemState(),
  mutations: mutations,
  actions: actions
}
