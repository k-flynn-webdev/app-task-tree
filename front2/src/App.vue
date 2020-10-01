<template>
  <div id="app">

    <navbar />

<!--    <div>-->
<!--      <router-link :to="{ name: 'project' }" class="has-text-link">-->
<!--        Projects-->
<!--      </router-link>-->
<!--      <router-link :to="{ name: 'plan' }" class="has-text-link">-->
<!--        Plans-->
<!--      </router-link>-->
<!--      <router-link :to="{ name: 'task' }" class="has-text-link">-->
<!--        Tasks-->
<!--      </router-link>-->
<!--    </div>-->

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
