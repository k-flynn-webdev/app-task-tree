<template>
  <b-navbar centered transparent class="mb-4 navbar">
    <template slot="brand">
      <b-navbar-item tag="router-link" :to="{ name: 'home' }">

        <svg class="icon mr-1" viewBox="0 0 100 100" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <path d="M76.37,36.698c0,-9.812 -7.966,-17.778 -17.778,-17.778l-35.555,0c-9.812,0 -17.778,7.966 -17.778,17.778l-0,35.556c-0,9.812 7.966,17.778 17.778,17.778l35.555,-0c9.812,-0 17.778,-7.966 17.778,-17.778l0,-35.556Z" style="fill:#284b53;"/>
          <path d="M43.492,84.926l-35.66,-35.661l18.228,-18.229l17.369,17.37l35.538,-35.538l18.292,18.291l-53.767,53.767Z" style="fill:#7ae742;"/>
        </svg>

        <h1 class="is-size-4 navbar__title">
          <strong>
            {{ title }}
          </strong>
        </h1>
      </b-navbar-item>
    </template>
    <template slot="start">
<!--      <b-navbar-item href="#">-->
<!--        Home-->
<!--      </b-navbar-item>-->
<!--      <b-navbar-item href="#" active>-->
<!--        Documentation-->
<!--      </b-navbar-item>-->
<!--      <b-navbar-dropdown label="Info" :collapsible="true">-->
<!--        <b-navbar-item href="#">-->
<!--          About-->
<!--        </b-navbar-item>-->
<!--        <b-navbar-item href="#">-->
<!--          Contact-->
<!--        </b-navbar-item>-->
<!--      </b-navbar-dropdown>-->
    </template>

    <template slot="end">
      <b-navbar-item tag="div">
        <div v-if="isLoggedIn"
             class="buttons is-right">
          <b-button class="flex-grow"
                    type="is-primary"
                    tag="router-link"
                    :to="{ name: 'user' }">
            User
          </b-button>
          <btnLogout />

        </div>
        <div v-else
             class="buttons is-right">
          <b-button class="flex-grow"
                    type="is-primary"
                    tag="router-link"
                    :to="{ name: 'create' }">
            Sign up
          </b-button>
          <b-button class="flex-grow"
                    tag="router-link"
                    :to="{ name: 'login' }">
            Login
          </b-button>
        </div>

      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
import { mapState } from 'vuex'
import btnLogout from '../components/btnLogout'
import { TYPES, APP_VARS } from '../constants'

export default {
  name: 'navbar',

  components: {
    btnLogout
  },

  computed: {
    ...mapState({ mode: state => state.mode }),
    ...mapState('user', ['isLoggedIn', 'user']),
    title () {
      if (this.mode.value === TYPES.project.value) return APP_VARS.name
      const storeOpened = this.$store.state.opened
      if (!storeOpened.value) return APP_VARS.name

      return storeOpened.value
    }
  }

}
</script>
