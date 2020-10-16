<template>

  <div class="navbar__options">

    <div class="navbar__options__user">
      <div class="option">
        <p class="title">User</p>
        <div></div>

      </div>
    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex'
// import btnLogout from '../components/btnLogout'
// import navSortBy from '../components/navSortBy'
import { TYPES, APP_VARS } from '../constants'

export default {
  name: 'navMenu',

  data () {
    return {
    }
  },

  components: {
    // btnLogout,
    // navSortBy
  },

  computed: {
    // ...mapState({ mode: state => state.mode }),
    // ...mapState('user', ['isLoggedIn', 'user']),
    // title () {
    //   if (this.mode.value === TYPES.project.value) return APP_VARS.name
    //   const storeOpened = this.$store.state.opened
    //   if (!storeOpened.value) return APP_VARS.name
    //
    //   return storeOpened.value
    // }
  }

}
</script>
