<template>
  <div
    id="app"
    class="task"
    :class="{ 'show-toast': hasToast, 'show-settings': displaySettings }">

    <ToastHolder />
    <AppSettings v-model="displaySettings" />

    <router-view />

    <div class="task__footer">
      <p>footer</p>
<!--      <router-link to="/switch">Switch</router-link>-->
    </div>

  </div>
</template>

<script>
import ToastHolder from './components/general/ToastHolder'
import AppSettings from './components/AppSettings'

export default {
  name: 'App',
  components: {
    AppSettings,
    ToastHolder
  },
  data () {
    return {
      displaySettings: false
    }
  },
  computed: {
    hasToast: function () {
      return this.$store.getters['toasts/toasts'].length > 0
    }
  }
}
</script>
