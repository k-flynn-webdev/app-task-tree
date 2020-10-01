<template>
  <section class="container mx-1">

    <div class="columns is-centered flex-wrap">
      <row-create :type="type" />

      <row-item v-for="item in items"
                :key="item.id"
                :item="item"
                :type="type"
                :class="{ 'is-active': current.id === item.id }"
                @reload="get"
      />
    </div>

  </section>
</template>

<script>
import rowCreate from '../components/rowCreate'
import rowItem from '../components/rowItem'
import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'Projects',

  components: {
    rowItem,
    rowCreate,
  },

  data () {
    return {
      isLoading: false
    }
  },

  props: {
    type: {
      type: String,
      default: ''
    }
  },

  computed: {
    current () {
      return this.$store.state[TYPES[this.type].store].current || { id: -1 }
    },
    items () {
      return this.$store.state[TYPES[this.type].store].items
    },
    mode () {
      return TYPES[this.type]
    }
  },

  mounted () {
    this.$store.commit('mode', TYPES[this.type])
    this.$store.commit('setQuery', this.$route.query)

    return this.get()
    .then (() => {
      const queryParam = Object.entries(this.$route.query)
      if (queryParam.length) {
        const keyType = queryParam[0][0]
        this.$store.dispatch(`${TYPES[keyType].store}/getById`,
            { id: queryParam[0][1] })
        .then(({ data }) => {
          this.$store.commit('setOpened', data.data)
        })
      }
    })
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

