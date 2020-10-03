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
    // clear any modes lower ..
    TYPES[this.type].children.forEach(item => {
      this.$store.commit(`${TYPES[item].store}/setCurrent`, null)
    })

    this.$store.commit('setQuery', this.$route.query)

    return this.getPageItems()
    .then (() => this.getOpenedItem())
  },

  methods: {
    /**
     * Add to store the opened query item
     */
    getOpenedItem () {
      const queryParam = Object.entries(this.$route.query)[0]
      if (queryParam && queryParam.length) {
        const keyType = queryParam[0]
        return this.$store.dispatch(`${TYPES[keyType].store}/getById`,
          { id: queryParam[1] })
        .then(({ data }) => {
          this.$store.commit('setOpened', data.data)
        })
      }
    },
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

