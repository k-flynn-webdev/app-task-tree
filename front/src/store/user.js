
// var app_name = process.env.VUE_APP_NAME || 'tokenStringKube'

// function tokenDecode (token) {
//   if (!token || token.length < 10) {
//     return
//   }
//
//   let tokenObj = {}
//   let splitTemp = []
//   splitTemp = token.split('.')
//   tokenObj.raw = token
//   tokenObj.payload = JSON.parse(window.atob(splitTemp[1]))
//   return tokenObj
// }

// function token_get () {
//   const item = window.localStorage.getItem(app_name)
//   if (item === null) {
//     return ''
//   }
//   return item
// }
// function token_set (value) {
//   window.localStorage.setItem(app_name, value)
// }
// function token_delete () {
//   window.localStorage.removeItem(app_name)
// }

export default {
  namespaced: true,
  state: {
    // requestObj: Function,
    // session: {
    //   active: Boolean,
    //   user: {
    //     id: String,
    //     name: String,
    //     email: String,
    //     role: String
    //   },
    //   token: 'token'
    // }
  },
  getters: {
    get_active: function (state) {
      // return state.session.active
    },
    get_user: function (state) {
      // return state.session.user
    },
    get_user_id: function (state) {
      // return { id: state.session.user.id }
    },
    get_token: function (state) {
      // return state.session.token
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
