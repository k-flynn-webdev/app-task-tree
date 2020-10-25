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
    },
    pageSort () {
      return this.$store.getters['getSortObj']
    }
  },

  watch: {
    pageSort () {
      return this.getPageItems()
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
    getItemFromRoute () {
      const queryKeys = Object.keys(this.$route.query)
      const keyFound = queryKeys.filter(item => keyTypesAllowed.includes(item))

      if (!keyFound || keyFound.length < 1) { return }

      const keyValue = this.$route.query[keyFound[0]]

      if (!keyValue) { return }

      const queryItem = {}
      queryItem[keyFound[0]] = keyValue

      return queryItem
    },
    /**
     * Add to store the opened query item
     */
    getOpenedItem () {
      const openItem = this.getItemFromRoute()

      // clear if none allowed keys found
      if (!openItem) {
        this.$store.commit('setOpened', null)
        this.$store.commit('setQuery', null)
        return
      }

      const keyName = Object.keys(openItem)[0]

      return this.$store.dispatch(`${TYPES[keyName].store}/getById`,
        { id: openItem[keyName] })
      .then(({ data }) => {
        this.$store.commit('setQuery', openItem)
        this.$store.commit('setOpened', data.data)
      })
    },

    /**
     * Get Items via API
     *
     * @return {Promise}
     */
    getPageItems () {
      const skip = get(this.$route, 'query.$skip')
      const relatedItem = this.getItemFromRoute()

      const APIObj = Object.assign({ $skip: skip, $sort: this.pageSort },
        relatedItem)

      return this.getPageItemsQuery(APIObj)
    },
    getPageItemsQuery (newQuery) {
      if (this.page.isLoading) return

      this.page.isLoading = true

      return this.$store.dispatch(`${TYPES[this.type].store}/get`,
        { query: newQuery })
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
      .finally(res => {
        this.page.isLoading = false
      })

    }
  }
}

