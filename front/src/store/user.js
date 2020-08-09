import UserService from '../services/UserService.js'
import general from '../constants/general'
import status from '../constants/status'
import Vue from 'vue'

/**
 * @returns {User|undefined|any}
 */
function defaultUser () {
  const userLocal = UserService.getUser()
  if (userLocal !== undefined) return userLocal

  return general.DEFAULT_USER()
}

/**
 * @returns {UserOptions}
 */
function defaultOptions () {
  const userOptions = general.DEFAULT_USER_OPTIONS()

  const userLocal = UserService.getOptions()
  if (!userLocal) return userOptions

  Object.entries(userLocal).forEach(([key, value]) => {
    Vue.set(userOptions, key, value)
  })

  return userOptions
}

export default {
  namespaced: true,
  state: {
    /**
     * Current User
     *
     * @returns {User}
     */
    user: defaultUser(),
    /**
     * User selected options for show/hide projects/tasks that are done
     *
     * @returns {UserOptions}
     */
    options: defaultOptions(),
    /**
     * user tasks / projects meta totals
     *
     * @returns {UserTotals}
     */
    totals: general.DEFAULT_TOTALS()
  },
  getters: {
    isAnon: (state) => state.user.role === status.ANON && state.user.id !== -1,
    isUser: (state) => state.user.role === status.USER,
    isAdmin: (state) => state.user.role === status.ADMIN,
    isValidUser: (state) => !(state.user.id < 0),
    /**
     * Returns if the User is currently logged in
     *
     * @param state
     * @param getters
     * @returns {boolean}
     */
    isLoggedIn: (state, getters) => (getters.isUser || getters.isAdmin)
  },
  mutations: {
    user: function (state, input) {
      Object.entries(input).forEach(([key, value]) => {
        Vue.set(state.user, key, value)
      })
    },
    options: function (state, input) {
      Object.entries(input).forEach(([key, value]) => {
        Vue.set(state.options, key, value)
      })

      if (input) {
        UserService.setOptions(state.options)
      }
    },
    totals: function (state, input) {
      Object.entries(input).forEach(([key, value]) => {
        Vue.set(state.totals, key, value)
      })
    }
  },
  actions: {
    // todo user  /  / delete /  /  etc
    /**
     * Get latest user account data
     *
     * @param {object}    context
     * @returns {promise} user
     */
    get: function (context) {
      return UserService.getMeta()
        .then(res => {
          context.commit('totals', res.data.data.totals)
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Get a anon user token
     *
     * @param {object}    context
     * @returns {promise} user
     */
    getAnonToken: function (context) {
      const userDetails = {
        id: context.state.user.id,
        created: context.state.user.meta.created
      }
      return UserService.getAnonApiToken(userDetails)
        .then(res => {
          return res
        })
    },
    /**
     * Login a user
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} user
     */
    login: function (context, input) {
      return UserService.login(input)
        .then(res => {
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Logout a user
     *
     * @param {object}    context
     * @returns {promise} user
     */
    logout: function (context) {
      if (context.getters.isAnon) return false
      return UserService.logout()
        .then(() => {
          context.commit('user', general.DEFAULT_USER())
          context.commit('tasks/setTasks', [], { root: true })
          context.commit('tasks/setHistory', null, { root: true })
          context.commit('projects/setProjects', [], { root: true })
          context.commit('projects/setHistory', null, { root: true })
          return true
        })
    },
    /**
     * Creates a user
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} anon user
     */
    create: function (context, input) {
      return UserService.create(input)
        .then(res => {
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Verify a user
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} user
     */
    verify: function (context, input) {
      return UserService.verify(input)
        .then(res => {
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Creates anon user
     *
     * @param {object}    context
     * @returns {promise} anon user
     */
    createAnon: function (context) {
      return UserService.createAnon()
        .then(res => {
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Upgrades a user (with ANON account id)
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} anon user
     */
    createUpgrade: function (context, input) {
      return UserService.createUpgrade(input)
        .then(res => {
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Updates a user details
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} anon user
     */
    update: function (context, input) {
      return UserService.update(input)
        .then(res => {
          context.commit('user', res.data.data.account)
          return res
        })
    },
    /**
     * Begin user password reset process
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} anon user
     */
    resetStart: function (context, input) {
      return UserService.resetStart(input)
        .then(res => {
          return res
        })
    },
    /**
     * Complete user password reset process
     *
     * @param {object}    context
     * @param {object}    input
     * @returns {promise} anon user
     */
    resetComplete: function (context, input) {
      return UserService.resetComplete(input)
        .then(res => {
          return res
        })
    }
    // for delayed/time consuming actions
  }
}
