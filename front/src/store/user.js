import Vue from 'vue'
import { get } from 'lodash-es'
import { USER, LOGIN } from '../constants';
import HTTP from '../services/HttpService'

const USER_LOCAL = 'user'
const NAME_MAX_LENGTH = 15

/**
 * Creates a default User Obj
 *
 * @return {User}
 */
const defaultUserObj = () => {
  return {
    id: -1,
    name: null,
    email: null,
    role: null,
    meta: null
  }
}

function initGetUser () {
  const userObj = localStorage.getItem(USER_LOCAL)
  if (!userObj) return defaultUserObj()
  return JSON.parse(userObj)
}

export default {
  namespaced: true,
  state: {
    user: initGetUser(),
    isLoggedIn: false
  },
  mutations: {
    /**
     * Sets the logged in state
     *
     * @param state
     * @param {boolean} input
     */
    isLoggedIn: function(state, input) {
        state.isLoggedIn = input
    },
    /**
     * Sets the User state
     *
     * @param state
     * @param {object} input
     */
    set: function (state, input) {
      Object.entries(input).forEach(([key, value]) => {
        Vue.set(state.user, key, value)
      })

      if (input.email) {
        let name = input.email.split('@')[0]
        name = name.length < NAME_MAX_LENGTH ?
          name : (name.slice(0,NAME_MAX_LENGTH - 2) + '..')
        Vue.set(state.user, 'name', name)
      }

      localStorage.setItem(USER_LOCAL, JSON.stringify(state.user))
    }
  },
  actions: {
    /**
     * Login User via API
     *
     * @param context
     * @param {Login}    input   login details
     * @return {Promise}
     */
    login: function (context, input) {
      return HTTP.post(LOGIN.API.POST, input)
      .then(({ data }) => {
        context.commit('set', data.user)
      })
    },
    /**
     * Get User details via API
     *
     * @param context
     * @return {Promise}
     */
    get: function (context) {
      return HTTP.get(USER.API.GET)
      .then(({ data }) => {
        context.commit('set', data.user)
        return data.user
      })
    },
    /**
     * Patch User details via API
     *
     * @param context
     * @param {object} input    object of changes
     * @return {Promise}
     */
    patch: function (context, input) {
      return HTTP.patch(`${USER.API.PATCH}/${context.state.user.id}`, input)
      .then(({ data }) => {
        context.commit('set', data.user)
      })
    },
    /**
     * Remove User via API
     *
     * @param context
     * @param {object} input    object of changes
     * @return {Promise}
     */
    remove: function (context, input) {
      return HTTP.remove(`${USER.API.DELETE}/${context.state.user.id}`)
    }
  }
}

/**
 * @typedef {object} Login
 *
 * @property {string}   strategy
 * @property {string}   email
 * @property {string}   password
 */
