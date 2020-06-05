<template>
  <div class="user__details">

      <div v-if="currentUser.id >= 0">
        <button @click="displayUser = !displayUser">
          Show
        </button>

        <div v-if="displayUser">
          <p
            v-for="(item, idx) in currentUser"
            :key="idx">
            {{ idx + ': ' + item }}
          </p>
        </div>
        <button>Logout</button>
      </div>

      <div v-else>
        <button>Login</button>
      </div>

  </div>

</template>

<script>
export default {
  name: 'UserDetails',
  data () {
    return {
      displayUser: false
    }
  },
  computed: {
    currentUser: function () {
      return this.$store.getters['user/user']
    }
  }
}
</script>
