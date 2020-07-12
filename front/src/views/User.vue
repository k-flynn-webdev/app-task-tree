<template>
  <div class="user relative">

    <router-link to="/" title="go to home" class="user__home">
      <p class="upper text-bold">Home</p>
    </router-link>

    <br>

    <Card class="user__card max-30">

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
            OK
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
// import StatusBar from './general/StatusBar'
import Card from '../components/general/Card'

export default {
  name: 'User',
  components: {
    Card
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
      // todo
      return true
    },
    submitUser: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING
      // if local ANON user is detected, upgrade
      // else create new user properly

      const newUserTmp = this.form
      return this.$store.dispatch('user/create', newUserTmp)
        .then(res => {
          res.isTimed = true
          this.status = status.CLEAR
          this.$store.commit('toasts/toastAdd', res)
        })
        .catch(err => this.handleError(err))
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
