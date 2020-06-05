import UserService from '../services/UserService.js'

function defaultUser () {
  const userLocal = UserService.getUser()
  if (userLocal !== undefined) return userLocal

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
    // for delayed/time consuming actions
  }
}
