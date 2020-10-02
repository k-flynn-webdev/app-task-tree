<template>
  <div id="app">

    <navbar />

    <select-bar v-if="showSelectBar" />

    <router-view/>

  </div>
</template>

<script>
import selectBar from './components/selectBar'
import navbar from './components/navbar'
import { TYPES } from './constants'

export default {
  name: 'App',

  components: {
    selectBar,
    navbar
  },

  computed: {
    showSelectBar () {
      return !!(TYPES[this.$route.name] && TYPES[this.$route.name].store)
    }
  }
}
</script>
