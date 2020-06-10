<template>
  <div class="user">

<!--    <div @click="display = !display">-->
<!--      <p> User: {{ currentUserName }} </p>-->
<!--    </div>-->

<!--    <UserDetails v-if="display" />-->

  </div>

</template>

<script>
// import UserDetails from './UserDetails'
// const NO_USER = 'ANON'

// import helpers from '../services/Helpers'
// import general from '../constants/general'

export default {
  name: 'User',
  components: {
    // UserDetails
  },
  data () {
    return {
      display: false,
      showUser: false
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  mounted () {
    if (this.user.id === -1) {
      return this.$store.dispatch('user/createAnon')
    }
  }
}
</script>
