<template>
  <section class="container">

    <div class="columns is-centered">

      <div class="column is-8 has-text-left">

        <div class="box">

          <p class="is-size-4 has-text-centered has-text-weight-bold">
            Admin
          </p>

          <form @submit.prevent="submitForm">

            <b-field label="Email"
                     :type="{ 'is-danger': email.errors.length > 0 }"
                     :message="email.errors">
              <b-input v-model="email.value"
                       type="email"
                       minLength="5"
                       @input="inputUpdate">
              </b-input>
            </b-field>

            <b-field label="Password"
                     :type="{ 'is-danger': password.errors.length > 0 }"
                     :message="password.errors">
              <b-input type="password"
                       minlength="8"
                       v-model="password.value"
                       @input="inputUpdate">
              </b-input>
            </b-field>

            <div class="columns is-gapless is-mobile is-vbottom">

              <div class="column">
                <router-link :to="{ name: 'create' }" class="has-text-link">
                  Create..
                </router-link>
              </div>

              <div class="column is-narrow">
                <b-button native-type="submit"
                          type="is-primary"
                          :disabled="isDisabled"
                          :loading="isLoading"
                          @click="submitForm">
                  Login
                </b-button>
              </div>

            </div>

          </form>

        </div>

        <div>
          <router-link :to="{ name: 'recover' }" class="has-text-link">
            Forgot password?
          </router-link>
        </div>

      </div>
    </div>

  </section>
</template>

<script>
import { USER } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'Admin',

  data () {
    return {
      email: {
        value: '',
        errors: []
      },
      password: {
        value: '',
        errors: []
      },
      isDisabled: true,
      isLoading: false
    }
  },

  methods: {
    inputUpdate () {
      this.isDisabled = true
      if (this.email.value.length < 5) return
      if (this.password.value.length < 8) return

      this.isDisabled = false
    },
    submitForm () {
      if (this.isDisabled) return
      if (this.isLoading) return

      this.isLoading = true

      const loginObj = {
        strategy: 'local',
        email: this.email.value,
        password: this.password.value
      }

      return this.$store.dispatch(`${USER.store}/login`, loginObj)
      .then(data => {
        this.isLoading = false

        this.$buefy.toast.open({
          duration: 1500,
          message: get(data, 'message', 'success'),
          position: 'is-top',
          type: 'is-success'
        })

        let self = this
        setTimeout(function () {
          self.$router.push({ name: 'home' })
        }, 1.5 * 1000)
      })
      .catch(err => {
        this.isLoading = false

        this.$buefy.toast.open({
          duration: 5000,
          message: get(err, 'response.data.message', 'error'),
          position: 'is-top',
          type: 'is-danger'
        })

        throw err
      })
    }
  }
}
</script>

