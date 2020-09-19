<template>
  <section>
    projects
  </section>
</template>

<script>
import { PROJECTS } from '../constants'
import HTTP from '../services/HttpService'
import { get } from 'lodash-es'

export default {
  name: 'Projects',

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

  created () {
    // return this.submitForm()
  },

  methods: {
    submitForm () {
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.get(PROJECTS.API.GET)
      .then(res => {
        this.isLoading = false

        this.$buefy.toast.open({
          duration: 1500,
          message: get(res, 'data.message', 'success'),
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

        throw err
      })
    }
  }
}
</script>

