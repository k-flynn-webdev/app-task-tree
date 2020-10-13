<template>

  <div class="navmenu__holder">
    <button class="button"
            @click="isActive = !isActive">
      O
    </button>

    <div class="navmenu__holder__main"
         :class="{ 'is-active': isActive }">
      menu content here in corner
    </div>
  </div>

<!--  <div class="has-background-light">-->
<!--    content here-->
<!--    <br>-->
<!--    and here-->
<!--  </div>-->

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
      isActive: false
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
