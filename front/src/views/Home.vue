<template>
  <div class="relative">

    <Header
      :mode="mode"
      :user="user"
      :valid-user="validUser" />

    <router-view />

  </div>
</template>

<script>
import Header from '../components/Header'
import modes from '../constants/modes'

export default {
  name: 'Home',
  components: {
    Header
  },
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    },
    validUser: function () {
      return !(this.user.id === null || this.user.id < 0)
    }
  },
  methods: {
  }
}
</script>
