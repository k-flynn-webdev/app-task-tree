<template>

    <div>
      <Card class="max-30 intro-text">
        <p class="title"> Welcome to MiniTask </p>
        <p class="intro-text__desc1"> A simple, fast, easy and shareable todo list. </p>
        <p class="intro-text__desc2"> To get started, choose a account option from below. </p>

        <div class="flex-row flex-between intro-text__buttons">
          <router-link
            class="text-bold color-fore"
            to="/user/login">
            Login
          </router-link>
          <router-link
            class="text-bold color-fore"
            to="/user/create">
            Create
          </router-link>
          <button
            v-if="showTry"
            class="intro-text__anon"
            @click="createAnonUser">
            Try
          </button>
        </div>

      </Card>

      <Card class="max-30 intro-text">
        <p class="title">
          Features:
        </p>

        <ul>
          <li> No need for an account </li>
          <li> A quick overview of progress </li>
          <li> Share projects with others (coming soon) </li>
          <li> Works on Mobile and Desktop </li>
        </ul>

      </Card>
    </div>

</template>

<script>
import Paths from '../constants/paths'
import helpers from '../services/Helpers'
import general from '../constants/general'
import Card from '../components/general/Card'

export default {
  name: 'Landing',
  components: {
    Card
  },
  computed: {
    showTry: function () {
      return this.$store.getters['user/user'].id < 0
    }
  },
  methods: {
    createAnonUser: function () {
      const userTmp = this.$store.getters['user/user']
      let initPromise = Promise.resolve(userTmp)

      if (userTmp && userTmp.id < 0) {
        initPromise = this.$store.dispatch('user/createAnon')
      }

      return initPromise
        .then(() => {
          helpers.timeDelay(() => {
            this.$router.push({ name: Paths.PROJECTS })
          }, general.DELAY_SUCCESS)
        })
        .catch(err => {
          this.$store.commit('toasts/toastAdd', err)
        })
    }
  }
}
</script>
