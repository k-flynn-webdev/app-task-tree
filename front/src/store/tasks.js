// import TaskService from '../services/TaskService.js'

export default {
  namespaced: true,
  state: {
    tasks: Array
  },
  getters: {
    tasks: function (state) {
      return state.tasks
    },
    task: function (state) {
      return function (id) {
        return state.tasks.filter(item => item.id === id)
      }
    }
  },
  mutations: {
    // to be fired ideally from actions here
    // requestObj: function (state, input) {
    //   state.requestObj = input
    // },
    active: function (state, input) {
      // state.session.active = input
    },
    user: function (state, input) {
      // state.session.user.id = input.id
      // state.session.user.name = input.name
      // state.session.user.email = input.email
      // state.session.user.role = input.role
    },
    token: function (state, input) {
      // state.session.token = input
      // token_set(input)
      // state.requestObj()
    }
  },
  actions: {
    init: function (context, requestFunc) {
      // context.commit('requestObj', requestFunc)
      //
      // const token = token_get()
      // if (token.length < 5) {
      //   context.dispatch('logout_success')
      // } else {
      //   context.dispatch('login_success', token)
      // }
    },
    login_success: function (context, tokenString) {
      // const decode = token_decode(tokenString)
      // context.commit('active', true)
      // context.commit('user', decode)
      // context.commit('token', tokenString)
    },
    logout_success: function (context) {
      // const nullUser = {
      //   id: '',
      //   name: '',
      //   email: '',
      //   role: ''
      // }
      //
      // context.commit('active', false)
      // context.commit('user', nullUser)
      // context.commit('token', '')
      //
      // token_delete()
    }
    // for delayed/time consuming actions
  }
}
