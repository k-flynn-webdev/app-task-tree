<template>
  <div class="is-flex">
    <template v-for="item in TYPES">
      <b-button v-if="item.store"
                :disabled="disablePage(item)"
                @click="loadPage(item)">
        {{ item.store }}
      </b-button>
    </template>
  </div>

</template>

<script>
import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'selectBar',

  data () {
    return {
      TYPES
    }
  },

  computed: {
    mode () {
      return this.$store.state.mode
    },
    query () {
      return this.$store.state.query
    },
    opened () {
      return this.$store.state.opened
    },
    current () {
      return this.$store.state[this.mode.store].current
    },
    hasSelected () {
      return !!(this.current && this.current.id > 0)
    }
  },

  methods: {

    // thoughts : todo
    // in order to go up to the parent. we take current query eg: /tasks? plan=9
    // and get the plan[9].project so we can do a /plans? project=X
    // perhaps store in the VueX for all each time a page load happens?

    disablePage (item) {
      const range = Math.abs(item.index - this.mode.index)
      const isBelow = item.index < this.mode.index

      if (isBelow) {
        if (range > 1) return true

        return !(this.hasSelected)
      }

      return false
    },
    // openPage (page) {
    //   // if (!page.parent) {
    //   //   this.loadPage(page)
    //   // }
    //   return this.$router.push(page.goto(), this.loadPage(page))
    //   // const selectedItem = this.$store.state[page.store].current
    //
    //   // if (page.route.mustSelect && ) return
    //
    // },
    loadPage (page) {
      console.log(page)

      const routeTo = page.route.name
      const routeFrom = this.$route.name

      if (routeTo === routeFrom) return



      this.$router.push({ name: page.route.name })
      // console.log(page)
      // this.$store.commit('mode', TYPES[page.value])
      // this.$store.commit('setOpened', page.query)
      // this.$store.dispatch(`${TYPES[page.name].store}/get`, page)
    },
    /**
     * Opens Item of Type to be worked with
     *    eg open a project to create plan items related to it ..
     */
    // onOpenItem () {
    //   const openObj = TYPES[this.type].down(this.item)
    //   this.$router.push(openObj,
    //       this.loadPage(openObj))
    // }
  }
}
</script>
