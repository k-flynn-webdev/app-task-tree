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
import { API } from '../constants/index'
import HTTP from 'services/HttpService'

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
      if (!this.isDisabled) return
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.get(API.USER.POST, {
        strategy: 'local',
        email: this.email.value,
        password: this.password.value
      })
      .then(res => {
        this.isLoading = false
        console.log(res)
      })
      .catch(err => {
        this.isLoading = false
        console.log(err)
      })
    }
  }
}
</script>

