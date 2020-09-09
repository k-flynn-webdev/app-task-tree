<template>
  <section>

    <div class="columns is-centered">
      <div class="column is-half has-text-left">

        <div class="box">

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

            <div class="is-right has-text-right">
              <b-button native-type="submit"
                        type="is-primary"
                        :disabled="isDisabled"
                        :loading="isLoading"
                        @click="submitForm">
                Create
              </b-button>
            </div>

          </form>

        </div>

      </div>
    </div>

  </section>
</template>

<script>
import CONSTANTS from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Create',

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

      return HTTP.post(CONSTANTS.API.USER.POST, {
        strategy: 'local',
        email: this.email.value,
        password: this.password.value
      })
      .then(res => {
        this.isLoading = false
        console.log(res)

        // todo server not sending a success [message] obj or token but
        // user obj instead

        this.$buefy.toast.open({
          duration: 1500,
          message: res.message || 'success',
          position: 'is-top',
          type: 'is-success'
        })
      })
      .catch(err => {
        this.isLoading = false

        this.$buefy.toast.open({
          duration: 5000,
          message: get(err, 'response.data.message', 'error'),
          position: 'is-top',
          type: 'is-danger'
        })
      })
    }
  }
}
</script>

