<template>
  <div v-if="showControls"
       class="column is-8 is-12-mobile px-0 mb-0">

    <div class="mx-1 is-flex flex-space-between">
      <button v-for="item in buttons"
              :disabled="item.disabled"
              :class="{ 'is-loading': item.loading }"
              class="button is-size-7-tablet has-text-weight-bold"
              @click="hasClicked(item)">
        {{ item.value }}
      </button>
    </div>

  </div>
</template>

<script>
import icStart from '../assets/icons/ic_round'
import icLeft from '../assets/icons/ic_left'
import icRight from '../assets/icons/ic_right'
import { TYPES, APP_VARS } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'pageControls',

  components: {
    icStart,
    icLeft,
    icRight
  },

  data () {
    return {
      buttons: {
        start: {
          disabled: false,
          value: 'Page 1',
          url: {},
          loading: false
        },
        pre: {
          disabled: false,
          value: 'Page x',
          url: {},
          loading: false
        },
        post: {
          disabled: false,
          value: 'Page x',
          url: {},
          loading: false
        }
      }
    }
  },

  props: {
    type: {
      type: String,
      default: ''
    }
  },

  // todo
  //    need to build a query obj thats a copy not a ref!

  computed: {
    itemTotal () {
      return this.$store.state[TYPES[this.type].store].total
    },
    itemSkip () {
      return Number(get(this.itemQuery, '$skip', 0))
    },
    itemQuery () {
      return this.$store.state.query
    },
    itemOpened () {
      return this.$store.state.opened
    },
    showControls () {
      return this.itemTotal > APP_VARS.pageLimit
    }
  },

  watch: {
    itemTotal: {
      handler: 'rebuild'
    },
    itemQuery: {
      immediate: true,
      handler: 'rebuild'
    }
  },

  methods: {
    buildQueryObj () {
      const tmp = {}
      const queryKeys = Object.keys(this.itemQuery)

      tmp.query = {}
      tmp.query.$skip = this.itemSkip
      tmp.name = TYPES[this.type].route.name

      for(let i =0; i < queryKeys.length; i++) {
        tmp.query[queryKeys[i]] = this.itemQuery[queryKeys[i]]
      }

      return tmp
    },
    hasClicked (item) {
      item.loading = true
      this.$router.push(item.url)
    },
    rebuild () {
      const startTmp = this.buildQueryObj()
      delete startTmp.query['$skip']

      const preTmp = this.buildQueryObj()
      const preSkipVal = this.itemSkip - APP_VARS.pageLimit
      preTmp.query['$skip'] = preSkipVal > 0 ? preSkipVal : 0

      const postTmp = this.buildQueryObj()
      postTmp.query['$skip'] = this.itemSkip + APP_VARS.pageLimit

      this.buttons.start.url = startTmp
      this.buttons.pre.url = preTmp
      this.buttons.post.url = postTmp

      this.buttons.start.loading = false
      this.buttons.pre.loading = false
      this.buttons.post.loading = false

      this.buttons.start.value = 'Page 1'
      this.buttons.pre.value = `Page ${Math.floor(preTmp.query['$skip'] / APP_VARS.pageLimit) + 1}`
      this.buttons.post.value = `Page ${Math.floor(postTmp.query['$skip'] / APP_VARS.pageLimit) + 1}`

      this.buttons.start.disabled = (this.itemSkip === 0)
      this.buttons.pre.disabled = (this.itemSkip < APP_VARS.pageLimit)
      this.buttons.post.disabled = this.itemTotal - (this.itemSkip + APP_VARS.pageLimit) <= 0
    }
  }

}
</script>
