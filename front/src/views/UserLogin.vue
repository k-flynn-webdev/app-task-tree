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
          Login
        </p>

        <form class="user__form" @submit.prevent="submitLogin">
          <div class="input-control">
            <label>
              <p>Email</p>
              <input
                required
                v-model="form.email"
                type="email"
                @input="resetStatus"
              >
            </label>
          </div>

          <div class="input-control">
            <label>
              <p>Password</p>
              <input required
                     v-model="form.password"
                     type="password"
                     minlength="7"
                     @input="resetStatus"
              >
            </label>
          </div>

        </form>

      </div>

      <template slot="footer" class="user__form__footer">
        <router-link
          class="text-bold color-fore"
          to="/user/create">
          Create
        </router-link>

        <button
          class="user__form__footer__ok-btn"
          :tabindex="!isValid ? -1: 0"
          :class="{ 'DISABLED': !isValid }"
          type="submit"
          @click.prevent="submitLogin">
          <p>OK</p>
        </button>
      </template>

    </Card>

    <div class="container max-30">
      <router-link
        class="color-success"
        :class="{ 'DISABLED': !showResetLink }"
        to="/user/reset">
        Lost password?
      </router-link>
    </div>

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
  name: 'UserLogin',
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
  computed: {
    isValid: function () {
      if (this.form.email.length < 4) return false
      if (this.form.email.indexOf('@') < 0) return false
      if (this.form.email.indexOf('.') < 0) return false
      if (this.status !== status.CLEAR) return false
      return this.form.password.length >= 7
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    showResetLink: function () {
      return this.user.email !== status.ANON
    }
  },
  methods: {
    resetStatus: function () {
      this.status = status.CLEAR
    },
    submitLogin: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING
      return this.$store.dispatch('user/login', this.form)
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function () {
      this.status = status.SUCCESS

      helpers.timeDelay(() => {
        this.status = status.CLEAR
        this.$router.push({ name: Paths.PROJECTS })
      }, general.DELAY_SUCCESS)
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
