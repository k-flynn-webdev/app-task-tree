<template>
  <div id="app">

    <navbar />

    <select-bar v-if="showSelectBar" />

    <router-view />

    <page-footer></page-footer>

  </div>
</template>

<script>
import selectBar from './components/selectBar'
import pageFooter from './components/pageFooter'
import navbar from './components/navbar'
import { TYPES } from './constants'

export default {
  name: 'App',

  components: {
    selectBar,
    navbar,
    pageFooter
  },

  computed: {
    showSelectBar () {
      return !!(TYPES[this.$route.name] && TYPES[this.$route.name].store)
    }
  }
}
</script>
