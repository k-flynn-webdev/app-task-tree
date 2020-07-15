<template>
  <div v-if="isLoggedIn" class="container max-30">
    <button class="bg-warning color-fore" @click="logout">
      Logout
    </button>
  </div>

</template>

<script>
import status from '../constants/status'
import helpers from '../services/Helpers'
import Paths from '../constants/paths'
import general from '../constants/general'

export default {
  name: 'UserLogout',
  computed: {
    isLoggedIn: function () {
      return this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    logout: function () {
      return this.$store.dispatch('user/logout')
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function () {
      helpers.timeDelay(() => {
        this.$router.push({ name: Paths.HOME })
      }, general.DELAY_SUCCESS)
    },
    handleError: function (err) {
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
