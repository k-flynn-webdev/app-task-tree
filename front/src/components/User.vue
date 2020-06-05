<template>
  <div class="user">

    <div @click="display = !display">
      <p> User: {{ currentUserName }} </p>
    </div>

    <UserDetails v-if="display" />

  </div>

</template>

<script>
import UserDetails from './UserDetails'
const NO_USER = 'ANON'

export default {
  name: 'User',
  components: {
    UserDetails
  },
  data () {
    return {
      display: false,
      showUser: false
    }
  },
  computed: {
    currentUserName: function () {
      if (this.currentUser.id < 0) {
        return NO_USER
      }
      return this.currentUser.name
    },
    currentUser: function () {
      return this.$store.getters['user/user']
    }
  }
}
</script>
