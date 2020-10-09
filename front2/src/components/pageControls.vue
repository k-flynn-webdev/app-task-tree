<template>
  <div v-if="showControls"
       class="column is-8 is-12-mobile px-0 mb-0">

<!--      <b-button class="m-1"-->
<!--                type="tag"-->
<!--                :disabled="start.disabled"-->
<!--                :to="start.url">-->
<!--        Page 1-->
<!--      </b-button>-->
<!--      <b-button class="m-1"-->
<!--                type="tag"-->
<!--                :disabled="pre.disabled"-->
<!--                :to="pre.url">-->
<!--        {{ pre.value }}-->
<!--      </b-button>-->
<!--      <b-button class="m-1"-->
<!--                type="tag"-->
<!--                :disabled="post.disabled"-->
<!--                :to="post.url">-->
<!--        {{ post.value }}-->
<!--      </b-button>-->
    <router-link :to="start.url"
                 :disabled="start.disabled">
      {{ start.value }}
    </router-link>
    <router-link :to="pre.url"
                 :disabled="pre.disabled">
      {{ pre.value }}
    </router-link>
    <router-link :to="post.url"
                 :disabled="post.disabled">
      {{ post.value }}
    </router-link>
    <span class="has-text-light">
      {{ itemTotal }}
    </span>

  </div>
</template>

<script>
import icStart from '../assets/icons/ic_round'
import icLeft from '../assets/icons/ic_left'
import icRight from '../assets/icons/ic_right'
import { TYPES, APP_VARS } from '../constants'
import { get } from 'lodash-es'
const dbTypesAllowed = [ '$limit', '$skip' ]
const keyTypesAllowed = [...Object.keys(TYPES), ...dbTypesAllowed]

export default {
  name: 'pageControls',

  components: {
    icStart,
    icLeft,
    icRight
  },

  data () {
    return {
      start: {
        disabled: false,
        value: 'Start',
        url: {}
      },
      pre: {
        disabled: false,
        value: 'Pre',
        url: {}
      },
      post: {
        disabled: false,
        value: 'Next',
        url: {}
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
      return true
      return this.itemTotal > APP_VARS.pageLimit
    },
    // allowGoToStart () {
    //   return (this.itemSkip > 0)
    // },
    // allowLeft () {},
    // allowRight () {},
    // goToStart () {
    //   return Object.assign(this.itemQuery, { $skip: 0 })
    // },
    // goToLeft () {
    //   const skipVal = Math.min(this.itemSkip - APP_VARS.pageLimit, 0)
    //   return Object.assign(this.itemQuery, { $skip: skipVal })
    // },
    // goToRight () {
    //   const skipVal = this.itemSkip + APP_VARS.pageLimit
    //   return Object.assign(this.itemQuery, { $skip: skipVal })
    // }
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
    // goto(item) {
    //   this.$router.push(item)
    // },
    rebuild () {
      const startTmp = this.buildQueryObj()
      delete startTmp.query['$skip']

      const preTmp = this.buildQueryObj()
      const preSkipVal = this.itemSkip - APP_VARS.pageLimit
      preTmp.query['$skip'] = preSkipVal > 0 ? preSkipVal : 0

      const postTmp = this.buildQueryObj()
      postTmp.query['$skip'] = this.itemSkip + APP_VARS.pageLimit

      this.start.url = startTmp
      this.pre.url = preTmp
      this.post.url = postTmp

      this.pre.value = `page ${Math.floor(preTmp.query['$skip'] / APP_VARS.pageLimit) + 1}`
      this.post.value = `page ${Math.floor(postTmp.query['$skip'] / APP_VARS.pageLimit) + 1}`

      this.start.disabled = (this.itemSkip === 0)
      this.pre.disabled = (this.itemSkip < APP_VARS.pageLimit)
      this.post.disabled = this.itemTotal - this.itemSkip <= 0
    }
  }

}
</script>
