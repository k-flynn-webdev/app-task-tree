import UserService from '../services/UserService.js'

function defaultUserObj () {
  return {
    id: -1,
    name: '',
    email: '',
    role: ''
  }
}

function defaultUser () {
  const userLocal = UserService.getUser()
  if (userLocal !== undefined) return userLocal

  // todo
  //  we need the Anom user id to be specific to
  //  THIS users PC so when they
  //  upgrade it's a seamless transfer of
  //  projects/tasks to the new user id..

  return defaultUserObj()
}

export default {
  namespaced: true,
  state: {
    user: defaultUser()
  },
  getters: {
    user: (state) => state.user,
    isLoggedIn: (state) => state.user.email.length > 4
  },
  mutations: {
    user: function (state, input) {
      state.user.id = input.id
      state.user.name = input.name
      state.user.email = input.email
      state.user.role = input.role
    }
  },
  actions: {
    // todo user create / update / delete / login / logout etc
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
          context.commit('user', defaultUserObj())
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
    }
    // for delayed/time consuming actions
  }
}
