<template>
  <div class="user relative">

    <router-link to="/" title="go to home" class="user__home">
      <p class="upper text-bold">Home</p>
    </router-link>

    <br>

    <Card class="user__card max-30">

      <div slot="default">

        <StatusBar :class="status" />

        <p class="title">
          Account Verified
        </p>

      </div>

    </Card>

  </div>
</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import StatusBar from '../components/general/StatusBar'
import Card from '../components/general/Card'
import Paths from '../constants/paths'

export default {
  name: 'UserVerify',
  components: {
    Card,
    StatusBar
  },
  data () {
    return {
      status: status.CLEAR,
      form: {
        email: '',
        password: ''
      }
    }
  },
  props: {
    verify: {
      type: String,
      default: ''
    }
  },
  computed: {
    showEmail: function () {
      return !this.verify
    },
    showPassword: function () {
      return this.verify
    },
    validPassword: function () {
      return this.form.password.length > 6
    },
    validEmail: function () {
      if (this.form.email.indexOf('@') < 0) return false
      if (this.form.email.indexOf('.') < 0) return false
      return this.form.email.length > 4
    },
    isValid: function () {
      return (this.status === status.CLEAR)
    }
  },
  methods: {
    resetStatus: function () {
      this.status = status.CLEAR
    },
    submitResetStart: function () {
      if (!this.validEmail) return
      if (!this.isValid) return

      this.status = status.WAITING
      return this.$store.dispatch('user/resetStart',
        { email: this.form.email })
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    submitResetComplete: function () {
      if (!this.validPassword) return
      if (!this.isValid) return

      this.status = status.WAITING
      return this.$store.dispatch('user/resetComplete',
        {
          verify: this.verify,
          password: this.form.pasword
        })
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function () {
      this.status = status.SUCCESS

      helpers.timeDelay(() => {
        this.status = status.CLEAR
        this.$router.push({ name: Paths.HOME })
      }, general.DELAY_SUCCESS)
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/addToast', err)
    }
  }
}
</script>
