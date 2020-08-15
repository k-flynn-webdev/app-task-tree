<template>

  <div>

    <router-link :to="{ name: 'home' }"
                 title="Home"
                 class="user__home text-bold fill-fore">
      <icBack class="md" />
    </router-link>

    <div class="user relative">

      <Card class="user__card max-30">

        <div slot="default">

          <StatusBar :class="status" />

          <p class="title">
            User
          </p>

          <form class="user__form" @submit.prevent="submitUserUpgrade">
            <div class="input-control">
              <label>
                <p>Name</p>
                <p v-if="!isEdit" class="user__form-detail">
                  {{ form.name }}
                </p>
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
                <p v-if="!isEdit" class="user__form-detail">
                  {{ form.email }}
                </p>
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
                <p v-if="!isEdit" class="user__form-detail">
                  xxxxx
                </p>
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
                <p v-if="user" class="user__form-detail">
                  {{ user.role }}
                </p>
              </label>
            </div>

          </form>

          <div v-if="user.meta" class="user__meta">

            <br>

            <div v-if="user.meta.created" class="input-control">
              <label>
                <p class="">Created</p>
                <p class="">
                  {{ renderDateTime(user.meta.created) }}
                </p>
              </label>
            </div>
            <div v-if="user.meta.updated" class="input-control">
              <label>
                <p class="">Updated</p>
                <p class="">
                  {{ renderDateTime(user.meta.updated) }}
                </p>
              </label>
            </div>
            <div v-if="user.meta.login" class="input-control">
              <label>
                <p class="">Login</p>
                <p class="">
                  {{ renderDateTime(user.meta.login) }}
                </p>
              </label>
            </div>
          </div>

          <br>

          <div class="input-control">
            <label>
              <p class="">Tasks</p>
              <p class="">
                {{ totals.tasksDone }}  /  {{ totals.tasks }}
              </p>
            </label>
          </div>

          <div class="input-control">
            <label>
              <p class="">Projects</p>
              <p class="">
                {{ totals.projectsDone }}  /  {{ totals.projects }}
              </p>
            </label>
          </div>

        </div>

        <template slot="footer" class="user__form__footer">
          <button
            type="button"
            class="user__form__footer__edit-btn"
            :class="{ 'DISABLED': !allowEdit }"
            :tabindex="!allowEdit ? -1: 0"
            @click.prevent="toggleEdit">
            <p v-if="!isEdit">Edit</p>
            <p v-else>Cancel</p>
          </button>

          <button
            type="submit"
            class="user__form__footer__ok-btn"
            :class="{ 'DISABLED': !isValid }"
            :tabindex="!isValid ? -1: 0"
            @click.prevent="submitUserUpgrade">
            <p>OK</p>
          </button>
        </template>

      </Card>

      <div class="container max-30">

        <p v-if="isAnon" class="word-break">
          Your account is a Anonymous and tied only to this device,
          but it can be upgraded to a User account which can be logged in any time from any device.
          <router-link
            class="color-success"
            to="/user/create">
            Upgrade
          </router-link>
        </p>

        <p v-if="isUser" class="word-break">
          Account type: User
        </p>

        <p v-if="!isVerified" class="word-break">
          !Account not verified
        </p>

        <p v-if="isAdmin" class="word-break">
          Your account is a Admin account.
        </p>

      </div>

    </div>
  </div>

</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import icBack from '../assets/icons/ic_left'
import Card from '../components/general/Card'
import StatusBar from '../components/general/StatusBar'
import { get } from 'lodash-es'
import { mapState, mapGetters } from 'vuex'

export default {
  name: 'User',
  components: {
    Card,
    icBack,
    StatusBar
  },
  data () {
    return {
      isEdit: false,
      status: status.CLEAR,
      form: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapState('user', {
      user: state => state.user,
      totals: state => state.totals
    }),
    ...mapGetters({
      isAnon: 'user/isAnon',
      isUser: 'user/isUser',
      isAdmin: 'user/isAdmin',
      isLoggedIn: 'user/isLoggedIn'
    }),
    allowEdit: function () {
      return (this.isUser || this.isAdmin)
    },
    isVerified: function () {
      return this.user.meta.verified
    },
    isValid: function () {
      if (!this.isLoggedIn) return false
      if (this.status !== status.CLEAR) return false
      return (this.isValidName || this.isValidEmail || this.isValidPassword)
    },
    isValidName: function () {
      return (this.form.name.length > 4 &&
        this.form.name !== this.user.name)
    },
    isValidEmail: function () {
      if (this.form.email.indexOf('@') < 0) return false
      if (this.form.email.indexOf('.') < 0) return false
      return (this.form.email.length > 4 &&
        this.form.email !== this.user.email)
    },
    isValidPassword: function () {
      return (this.form.password.length > 7 &&
        this.form.password !== this.user.password)
    }
  },
  mounted () {
    this.resetForm()
  },
  methods: {
    renderDateTime: function (input) {
      return helpers.renderDateTime(input)
    },
    toggleEdit: function () {
      this.isEdit = !this.isEdit
      this.resetForm()
    },
    resetForm: function () {
      if (!this.user) return
      this.form.name = this.user.name
      this.form.email = this.user.email
      this.form.password = ''
    },
    resetStatus: function () {
      this.status = status.CLEAR
    },
    submitUserUpgrade: function () {
      if (this.status !== status.CLEAR) return
      if (!this.isValid) return

      this.status = status.WAITING

      const newUser = {
        id: this.user.id,
        name: this.isValidName ? this.form.name : undefined,
        email: this.isValidEmail ? this.form.email : undefined,
        password: this.validPassword ? this.form.password : undefined
      }

      return this.$store.dispatch('user/update', newUser)
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err, this.submitUserUpgrade))
    },
    handleSuccess: function (res) {
      res.isTimed = true
      res.isError = false
      this.status = status.SUCCESS
      this.$store.commit('toasts/addToast', res)

      helpers.timeDelay(() => {
        this.status = status.CLEAR
        this.toggleEdit()
      }, general.DELAY_SUCCESS)
    },
    handleError: function (err, cbRetry) {
      const errStatus = get(err, 'response.status')
      if (errStatus && errStatus === 401 &&
        this.$store.getters['user/isAnon'] &&
        cbRetry) {
        return cbRetry()
      }

      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/addToast', err)

      throw err
    }
  }
}
</script>
