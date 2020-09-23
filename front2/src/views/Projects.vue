<template>
  <section class="container mx-1">

    <div class="columns is-centered flex-wrap">
      <projectCreate />

      <row-item v-for="item in items"
                :key="item.id"
                :item="item"
                :type="type"
      />
    </div>

  </section>
</template>

<script>
import projectCreate from '../components/projectCreate'
import rowItem from '../components/rowItem'
import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'Projects',

  components: {
    rowItem,
    projectCreate
  },

  data () {
    return {
      isLoading: false,
      type: 'project'
    }
  },

  computed: {
    current () {
      return this.$store.state[TYPES[this.type].store].current
    },
    items () {
      return this.$store.state[TYPES[this.type].store].items
    }
  },

  created () {
    return this.get()
  },

  methods: {
    /**
     * Get Items via API
     *
     * @return {Promise}
     */
    get () {
      if (this.isLoading) return

      this.isLoading = true

      return this.$store.dispatch(`${TYPES[this.type].store}/get`,
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

