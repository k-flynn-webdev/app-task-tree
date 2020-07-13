import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './styles/index.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    // const userTmp = this.$store.getters['user/user']
    // let initPromise = Promise.resolve(userTmp)

    // if (userTmp && userTmp.id < 0) {
    //   initPromise = this.$store.dispatch('user/createAnon')
    // }
    //
    // return initPromise
    //   .then(user => {
    //     return this.$store.dispatch('projects/getProjectsByUserId',
    //       { user: user.id })
    //   })
    //   .catch(err => {
    //     this.$store.commit('toasts/toastAdd', err)
    //   })
  }
}).$mount('#app')
