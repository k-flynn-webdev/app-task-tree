<template>
  <div>

    <p> new user to switch to for testing: </p>

    <input type="number" v-model="newUser" >
    <button
      class="bg-fore color-bg"
      @click="switchUser">
      Switch
    </button>

    <button
      class="bg-fore color-bg"
      @click="goHome">
      Exit
    </button>

  </div>
</template>

<script>
import Paths from '../constants/paths.js'

export default {
  name: 'switchUser',
  components: {
  },
  data () {
    return {
      newUser: -1
    }
  },
  methods: {
    goHome: function () {
      this.$router.push({ name: Paths.HOME })
    },
    switchUser: function () {
      // todo this will NOT go live, only for debug
      if (this.newUser < 0) return
      const USER_PAYLOAD = 'user_payload'
      const newUser = {
        id: this.newUser,
        name: 'anon',
        email: 'anon',
        role: 'user'
      }

      localStorage.setItem(USER_PAYLOAD,
        JSON.stringify(newUser))

      this.$store.commit('user/user', newUser)
      return this.$store.dispatch('projects/getProjectsByUserId',
        { user: newUser.id })
        .then(() => {
          this.$router.push({ name: Paths.HOME })
        })
        .catch(err => {
          this.$store.commit('toasts/toastAdd', err)
        })
    }
  }
}
</script>
