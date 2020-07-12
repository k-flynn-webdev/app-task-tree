<template>
  <div class="user relative">

    <router-link to="/" title="go to home" class="user__home">
      <p class="upper text-bold">Home</p>
    </router-link>

    <br>

    <Card class="user__card max-30 WAITING">

      <StatusBar />

      <div class="text-center ">
        <p class="upper text-bold display-inline-b">
          Create
        </p>
      </div>

      <form class="user__form" @submit.prevent="submitUser">
        <div class="input-control">
          <label>
            <p>Name</p>
            <input required
                   v-model="form.name"
                   type="string"
                   minlength="4" >
          </label>
        </div>

        <div class="input-control">
          <label>
            <p>Email</p>
            <input
              required
              v-model="form.email"
              type="email"
            >
          </label>
        </div>

        <div class="input-control">
          <label>
            <p>Password</p>
            <input required
                   v-model="form.password"
                   type="password"
                   minlength="7" >
          </label>
        </div>

        <div class="user__form__accept">
          <button
            class="user__form__accept-btn"
            type="submit"
            @click.prevent="submitUser">
            <p>OK</p>
          </button>

        </div>
      </form>

    </Card>

  </div>
</template>

<script>
// import helpers from '../services/Helpers'
// import general from '../constants/general'
import status from '../constants/status.js'
import StatusBar from '../components/general/StatusBar'
import Card from '../components/general/Card'
const ANON = 'anon'

export default {
  name: 'User',
  components: {
    Card,
    StatusBar
  },
  data () {
    return {
      status: status.CLEAR,
      form: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    isValid: function () {
      if (this.form.name.length < 4) return false
      if (this.form.email.length < 4) return false
      if (this.form.email.indexOf('@') < 0) return false
      if (this.form.email.indexOf('.') < 0) return false
      return this.form.password.length >= 7
    },
    submit: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING
      if (this.user && this.user.name === ANON) {
        return this.submitUserUpgrade()
      } else {
        return this.submitUser()
      }
    },
    submitUser: function () {
      return this.$store.dispatch('user/create', this.form)
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    submitUserUpgrade: function () {
      const newUser = {
        id: this.user.id,
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }
      return this.$store.dispatch('user/createUpgrade', newUser)
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function (res) {
      res.isTimed = true
      this.status = status.CLEAR
      this.$store.commit('toasts/toastAdd', res)
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
