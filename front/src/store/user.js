import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    user: null,
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
    user: function (state, input) {
      Object.entries(input).forEach(([key, value]) => {
        Vue.set(state.user, key, value)
      })
    },
  },
  actions: {
  },
  modules: {
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
