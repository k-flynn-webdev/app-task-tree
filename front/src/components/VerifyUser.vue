<template>
  <br>
</template>

<script>
import paths from '../constants/paths'
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'

export default {
  name: 'VerifyUser',
  props: {
    verify: {
      type: String,
      default: modes.CLEAR
    }
  },
  mounted () {
    return this.verifyUser()
  },
  methods: {
    verifyUser: function () {
      return this.$store.dispatch('user/verify', this.verify)
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function (res) {
      const toastMsg = {
        message: res.data.message,
        isTimed: true,
        isError: false
      }
      this.$store.commit('toasts/toastAdd', toastMsg)

      helpers.timeDelay(() => {
        this.$router.push({ name: paths.HOME })
      }, general.DELAY)
    },
    handleError: function (err) {
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
