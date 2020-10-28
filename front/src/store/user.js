import Vue from 'vue'
import { get } from 'lodash-es'
import { USER } from '../constants';
import HTTP from '../services/HttpService'

const USER_LOCAL = 'user'

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

      localStorage.setItem(USER_LOCAL, JSON.stringify(state.user))
    },
  },
  actions: {
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
