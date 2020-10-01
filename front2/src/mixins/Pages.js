import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  data () {
    return {
      page: {
        isLoading: false
      }
    }
  },

  computed: {
    pageCurrentItem () {
      return this.$store.state[TYPES[this.type].store].current || { id: -1 }
    },
    pageItems () {
      return this.$store.state[TYPES[this.type].store].items
    },
    pageMode () {
      return TYPES[this.type]
    }
  },

  mounted () {
    this.$store.commit('mode', TYPES[this.type])
    this.$store.commit('setOpened', this.$route.query)

    return this.getPageItems()
    .then (() => {
      if (this.pageMode.parent) {
        // get parent item
      }
    })
  },

  methods: {
    /**
     * Get Items via API
     *
     * @return {Promise}
     */
    getPageItems () {
      if (this.page.isLoading) return

      this.page.isLoading = true

      return this.$store.dispatch(`${TYPES[this.type].store}/get`,
          { query: this.$route.query })
        .then(res => {
          this.page.isLoading = false

          this.$buefy.toast.open({
            duration: 1500,
            message: get(res, 'data.message', 'success'),
            position: 'is-top',
            type: 'is-success'
          })
        })
        .catch(err => {
          this.page.isLoading = false

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

