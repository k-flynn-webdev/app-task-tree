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
    const userFound = this.$store.getters['user/user']
    if (userFound.id < 0) return

    return this.$store.dispatch('projects/getProjectsByUserId',
      { user: userFound.id })
      .then(() => {})
      .catch(err => this.$store.commit('toasts/toastAdd', err))
  }
}).$mount('#app')
