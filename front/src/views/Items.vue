<template>
  <section class="container mx-1">

    <select-bar />

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
import selectBar from '../components/selectBar'
import rowCreate from '../components/rowCreate'
import rowItem from '../components/rowItem'
import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'Items',

  components: {
    rowItem,
    rowCreate,
    selectBar,
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
    this.$store.commit('setOpened', this.$route.query)

    return this.get()
    .then (() => {
      if (this.mode.parent) {
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

