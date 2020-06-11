<template>
  <div class="user">

    <div class="flex-row">
      <div class="flex-auto"></div>
      <span> User: {{ user.name }} ID: {{ user.id }} </span>
      <img
        class="icon big display-inline-b"
        src="@/assets/icons/ic_user.svg" />
    </div>

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
      // display: false,
      // showUser: false
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
