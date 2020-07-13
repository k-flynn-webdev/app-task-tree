<template>
  <div v-if="userValid" class="container max-30">
    <button class="bg-warning color-fore" @click="logout">
      Logout
    </button>
  </div>

</template>

<script>
const ANON = 'anon'

export default {
  name: 'UserLogout',
  computed: {
    userValid: function () {
      const userEmail = this.$store.getters['user/user'].email
      return (userEmail &&
      userEmail !== ANON &&
      userEmail.length > 4)
    }
  },
  methods: {
    logout: function () {
      return this.$store.dispatch('user/logout')
    }
  }
}
</script>
