import Vue from 'vue'
import router from '../router'
import { PLAN } from '../constants';
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
   * Sets the current selected plan
   *
   * @param state
   * @param {object} input    plan to set
   */
  setCurrent: function(state, input) {
      state.current = input
  },
  /**
   * Sets the Plans
   *
   * @param state
   * @param {array} input   list of plans
   */
  set: function (state, input) {
    Vue.set(state, 'items', input)
  },
  /**
   * Add a Project
   *
   * @param state
   * @param {object} input   project
   */
  post: function (state, input) {
    state.items.unshift(input)
  },
  /**
   * Patch a Plan via the id
   *
   * @param state
   * @param {object} input   plan
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
   * Create a Plan via the API
   *
   * @param context
   * @param {object} input
   * @return {Promise}
   */
  post: function (context, input) {
    context.commit('setLoading', true)
    return HTTP.post(PLAN.API.POST, input)
      .then(res => {
        if (get(router.currentRoute, 'query.page')) return

        context.commit('post',
          get(res, 'data.data'))
      })
      .finally(() => context.commit('setLoading', false))
  },
  /**
   * Patch a Plan via the API
   *
   * @param context
   * @param {object} input
   * @return {Promise}
   */
  patch: function (context, input) {
    context.commit('setLoading', true)
    return HTTP.patch(PLAN.API.PATCH + '/' + input.id, input)
    .then(res => {
      context.commit('patch',
        get(res, 'data.data'))
    })
    .finally(() => context.commit('setLoading', false))
  },
  /**
   * Remove a Plan via the API
   *
   * @param context
   * @param {number} id
   * @return {Promise}
   */
  remove: function (context, id) {
    context.commit('setLoading', true)
    return HTTP.remove(PLAN.API.DELETE + '/' + id)
    .then(() => {
      context.dispatch('get', router.currentRoute)
    })
    .finally(() => context.commit('setLoading', false))
  },
  /**
   * Get Plans via the API
   *
   * @param context
   * @param {object} input    input query
   * @return {Promise}
   */
  get: function (context, input) {
    context.commit('setLoading', true)
    return HTTP.get(PLAN.API.GET, { params: input.query })
    .then(res => {
      context.commit('set',
        get(res, 'data.data'))
      context.commit('setTotal',
        get(res, 'data.total'))
    })
    .finally(() => context.commit('setLoading', false))
  },
  /**
   * Get A Plan via the API
   *
   * @param context
   * @param {object} input    input query
   * @return {Promise}
   */
  getById: function (context, input) {
    context.commit('setLoading', true)
    return HTTP.get(PLAN.API.GET + '/' + input.id)
    .finally(() => context.commit('setLoading', false))
  }
}

export default {
  namespaced: true,
  state: initItemState(),
  mutations: mutations,
  actions: actions
}
