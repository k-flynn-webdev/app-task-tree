<template>
</template>

<script>
import { LOGIN } from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Logout',

  data () {
    return {
      isLoading: false
    }
  },

  mounted () {
    return this.submitForm()
  },

  methods: {
    submitForm () {
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.remove(LOGIN.API.DELETE)
      .then(res => {
        this.isLoading = false

        this.$buefy.toast.open({
          duration: 1500,
          message: get(res, 'data.message', 'success'),
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

