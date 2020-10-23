<template>
  <b-button class="mb-2"
            type="is-primary"
            expanded
            :loading="isLoading"
            @click="submitForm">
    Logout
  </b-button>
</template>

<script>
import { LOGIN, HOME } from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'btnLogout',

  data () {
    return {
      isLoading: false
    }
  },

  methods: {
    submitForm () {
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.remove(LOGIN.API.DELETE)
      .then(res => {
        HTTP.authRemove()
        this.isLoading = false

        this.$buefy.toast.open({
          duration: 1500,
          message: get(res, 'data.message', 'success'),
          position: 'is-top',
          type: 'is-success'
        })

        this.$router.push(HOME.route)
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

