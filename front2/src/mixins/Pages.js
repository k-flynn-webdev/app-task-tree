import { TYPES } from '../constants'
import { get } from 'lodash-es'

const keyTypesAllowed = Object.keys(TYPES)

export default {
  data () {
    return {
      edit: -1,
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

  beforeRouteUpdate (to, from, next) {
    this.getPageItemsQuery(to.query)
    next()
  },

  created () {
    this.init()
  },

  methods: {
    init () {
      this.$store.commit('mode', TYPES[this.type])
      // clear any modes lower ..
      TYPES[this.type].children.forEach(item => {
        this.$store.commit(`${TYPES[item].store}/setCurrent`, null)
      })

      // this.$store.commit('setQuery', this.$route.query)

      return this.getPageItems()
      .then (() => this.getOpenedItem())
    },
    /**
     * Sets current opened item to be edited
     *
     * @param {Number} input
     */
    onEdit (input) {
      this.edit = input
    },
    /**
     * Add to store the opened query item
     */
    getOpenedItem () {
      const queryKeys = Object.keys(this.$route.query)
      const keyFound = queryKeys.filter(item => keyTypesAllowed.includes(item))

      // clear if none allowed keys found
      if (!keyFound || keyFound.length < 1) {
        this.$store.commit('setOpened', {})
        return
      }

      const keyName = keyFound[0]
      const keyValue = this.$route.query[keyName]

      if (!keyValue) return

      return this.$store.dispatch(`${TYPES[keyName].store}/getById`,
        { id: keyValue })
      .then(({ data }) => {
        this.$store.commit('setOpened', data.data)
      })
    },


    /**
     * Get Items via API
     *
     * @return {Promise}
     */
    getPageItems () {
      const APISort = this.$store.getters['getSortObj']
      const skip = get(this.$route, 'query.$skip')
      const routeQuery = this.$route.query
      const APIObj = Object.assign({ $skip: skip, $sort: APISort }, routeQuery)

      return this.getPageItemsQuery(APIObj)
    },
    getPageItemsQuery (newQuery) {
      if (this.page.isLoading) return

      this.page.isLoading = true

      return this.$store.dispatch(`${TYPES[this.type].store}/get`,
        { query: newQuery })
      .then(res => {
        this.page.isLoading = false
        this.$store.commit('setQuery', newQuery)
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

