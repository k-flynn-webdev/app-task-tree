<template>
  <br>
</template>

<script>
import paths from '../constants/paths'
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import userService from '../services/UserService'

export default {
  name: 'GetUser',
  props: {
    user: {
      type: String,
      default: modes.CLEAR
    }
  },
  mounted () {
    return this.getUser()
  },
  methods: {
    getUser: function () {
      return userService.getUserDev({ user: this.user })
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

      helpers.timeDelay(() => {
        this.$store.commit('setStatus', status.CLEAR)
      }, general.DELAY_ERROR)
    }
  }
}
</script>
