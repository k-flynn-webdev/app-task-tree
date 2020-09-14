<template>
</template>

<script>
import CONSTANTS from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Verify',

  data () {
    return {
      isLoading: false
    }
  },

  computed: {
    token () {
      return (this.$route.params && this.$route.params.token)
    }
  },

  mounted () {
    return this.submitForm()
  },

  methods: {
    submitForm () {
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.get(CONSTANTS.API.USER.VERIFY + '/' + this.token)
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

