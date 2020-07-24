<template>
  <div
    id="app"
    class="task"
    :class="{ 'show-toast': hasToast, 'show-settings': displaySettings }">

    <ToastHolder />
    <AppSettings v-model="displaySettings" />
    <StatusBar class="top" :status="appStatus" />

    <router-view />

    <Footer />

  </div>
</template>

<script>
import ToastHolder from './components/general/ToastHolder'
import AppSettings from './components/AppSettings'
import StatusBar from './components/general/StatusBar'
import Footer from './components/general/Footer'

export default {
  name: 'App',
  components: {
    AppSettings,
    ToastHolder,
    StatusBar,
    Footer
  },
  data () {
    return {
      displaySettings: false
    }
  },
  computed: {
    appStatus: function () {
      return this.$store.getters.status
    },
    hasToast: function () {
      return this.$store.getters['toasts/toasts'].length > 0
    }
  }
}
</script>
