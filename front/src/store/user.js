import UserService from '../services/UserService.js'

function defaultUser () {
  const userLocal = UserService.getUser()
  if (userLocal !== undefined) return userLocal

  // todo
  //  we need the Anom user id to be specific to
  //  THIS users PC so when they
  //  upgrade it's a seamless transfer of
  //  projects/tasks to the new user id..

  return {
    id: -1,
    name: '',
    email: '',
    role: 'user'
  }
}

export default {
  namespaced: true,
  state: {
    user: defaultUser()
  },
  getters: {
    user: (state) => state.user
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
    }
    // for delayed/time consuming actions
  }
}
