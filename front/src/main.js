import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import status from './constants/status'
import helpers from './services/Helpers'
import general from './constants/general'
import './styles/index.scss'

Vue.config.productionTip = true

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    const userFound = this.$store.getters['user/user']
    if (userFound.id < 0) return

    this.$store.commit('status', status.CLEAR)
    helpers.timeDelay(() => {
      this.$store.commit('status', status.WAITING)
    }, general.DELAY_BLIP)

    let getUserAnonToken = Promise.resolve()
    if (userFound.role === status.ANON) {
      getUserAnonToken = this.$store.dispatch('user/getAnonToken')
    }

    // get latest data of user
    return getUserAnonToken
      .then(() => this.$store.dispatch('user/get'))
      .then(() => {
        this.$store.dispatch('projects/getProjectsByUserId',
          { user: userFound.id })
      })
      .then(() => {
        helpers.timeDelay(() => {
          this.$store.commit('status', status.SUCCESS)
          this.$store.commit('ready', true)
        }, general.DELAY_BLIP)
      })
      .catch(err => this.$store.commit('toasts/toastAdd', err))
  }
}).$mount('#app')
