<template>
  <section>
    <projectCreate />
  </section>
</template>

<script>
import { get } from 'lodash-es'

import projectCreate from '../components/projectCreate'

export default {
  name: 'Projects',

  components: {
    projectCreate
  },

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
    return this.getProjects()
  },

  methods: {
    /**
     * Get projects via API
     *
     * @return {Promise}
     */
    getProjects () {
      if (this.isLoading) return

      this.isLoading = true

      return this.$store.dispatch('projects/getProjects',
          { query: this.$route.query })
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

