<template>
  <div class="user relative">

    <router-link to="/" title="go to home" class="user__home">
      <p class="upper text-bold">Home</p>
    </router-link>

    <br>

    <Card class="user__card max-30">

      <div slot="default">

        <StatusBar :class="status" />

        <div class="text-center ">
          <p class="upper text-bold display-inline-b">
            User
          </p>
        </div>

        <form class="user__form" @submit.prevent="submitUserUpgrade">
          <div class="input-control">
            <label>
              <p>Name</p>
              <p v-if="!isEdit" class="user__form-detail"> {{ form.name }} </p>
              <input v-else
                required
                v-model="form.name"
                type="text"
                minlength="4"
                @input="resetStatus"
              >
            </label>
          </div>

          <div class="input-control">
            <label>
              <p>Email</p>
              <p v-if="!isEdit" class="user__form-detail"> {{ form.email }} </p>
              <input
                v-else
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
              <p v-if="!isEdit" class="user__form-detail"> xxxxx </p>
              <input
                v-else
                required
                v-model="form.password"
                type="password"
                minlength="7"
                @input="resetStatus"
              >
            </label>
          </div>

          <div class="input-control">
            <label>
              <p>Role</p>
              <p class="user__form-detail"> {{ form.role }} </p>
            </label>
          </div>

        </form>

      </div>

      <template slot="footer" class="user__form__footer">
        <button
          type="button"
          class="user__form__footer__edit-btn"
          @click.prevent="toggleEdit">
          <p v-if="!isEdit">Edit</p>
          <p v-else>Cancel</p>
        </button>

        <button
          type="submit"
          class="user__form__footer__ok-btn"
          :tabindex="!isValid ? -1: 0"
          :class="{ 'DISABLED': !isValid }"
          @click.prevent="submitUserUpgrade">
          <p>OK</p>
        </button>
      </template>

    </Card>

  </div>
</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
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
      isEdit: false,
      status: status.CLEAR,
      form: {
        role: '',
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    isValid: function () {
      if (this.form.name.length < 4) return false
      if (this.form.email.length < 4) return false
      if (this.form.email.indexOf('@') < 0) return false
      if (this.form.email.indexOf('.') < 0) return false
      return this.form.password.length >= 7
    },
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    toggleEdit: function () {
      this.isEdit = !this.isEdit
      this.resetForm()
    },
    resetForm: function () {
      if (!this.user) return
      this.form.name = this.user.name
      this.form.email = this.user.email
      this.form.role = this.user.role
    },
    resetStatus: function () {
      this.status = status.CLEAR
    },
    submitUserUpgrade: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return
      if (this.user && this.user.name === ANON) return

      this.status = status.WAITING

      const newUser = {
        id: this.user.id,
        name: this.form.name,
        email: this.form.email,
        password: this.form.password
      }

      if (this.form.name.length > 1 &&
        this.form.name !== this.user.name) {
        newUser.name = this.form.name
      }
      if (this.form.email.length > 1 &&
        this.form.email !== this.user.email) {
        newUser.email = this.form.email
      }
      if (this.form.password.length > 1 &&
        this.form.password !== this.user.password) {
        newUser.password = this.form.password
      }

      return this.$store.dispatch('user/createUpgrade', newUser)
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function (res) {
      res.isTimed = true
      res.isError = false
      this.status = status.SUCCESS
      this.$store.commit('toasts/toastAdd', res)

      helpers.timeDelay(() => {
        this.status = status.CLEAR
        this.toggleEdit()
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
