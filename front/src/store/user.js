import UserService from '../services/UserService.js'
import general from '../constants/general'
import status from '../constants/status'

function defaultUser () {
  const userLocal = UserService.getUser()
  if (userLocal !== undefined) return userLocal

  return general.DEFAULT_USER()
}

function defaultOptions () {
  const userLocal = UserService.getOptions()
  if (userLocal !== undefined) return userLocal

  return general.DEFAULT_USER_OPTIONS()
}

export default {
  namespaced: true,
  state: {
    user: defaultUser(),
    options: defaultOptions(),
    totals: general.DEFAULT_TOTALS()
  },
  getters: {
    user: (state) => state.user,
    totals: (state) => state.totals,
    options: (state) => state.options,
    /**
     * Returns if the User is currently logged in
     *
     * @param state
     * @returns {boolean}
     */
    isLoggedIn: (state) => {
      return (state.user &&
        state.user.email !== status.ANON &&
      state.user.email.length > 4)
    }
  },
  mutations: {
    user: function (state, input) {
      state.user.id = input.id
      state.user.name = input.name
      state.user.email = input.email
      state.user.role = input.role
    },
    options: function (state, input) {
      if (input.tasks && input.tasks.showDone !== undefined) {
        state.options.tasks.showDone = input.tasks.showDone
      }
      if (input.projects && input.projects.showDone !== undefined) {
        state.options.projects.showDone = input.projects.showDone
      }

      if (input) {
        UserService.setOptions(state.options)
      }
    },
    totals: function (state, input) {
      state.totals.tasks = input.tasks
      state.totals.tasksDone = input.tasksDone
      state.totals.projects = input.projects
      state.totals.projectsDone = input.projectsDone
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
          context.commit('totals', res.data.data)
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
      return UserService.logout()
        .then(res => {
          context.commit('user', general.DEFAULT_USER())
          return res
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
          return res.data.data.account
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
