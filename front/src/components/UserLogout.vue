<template>
  <div v-if="userValid" class="container max-30">
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

const ANON = 'anon'

export default {
  name: 'UserLogout',
  computed: {
    userValid: function () {
      const userEmail = this.$store.getters['user/user'].email
      return (userEmail &&
      userEmail !== ANON &&
      userEmail.length > 4)
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
