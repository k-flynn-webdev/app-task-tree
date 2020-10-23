<template>
  <div>
    <b-navbar class="navbar"
              centered
              transparent
              :active="isOpen"
              :class="{ 'is-active': isOpen }"
              :mobileBurger="false"
              @update:active="closeNavBar">
      <template slot="brand">

        <b-navbar-item
            tag="router-link"
            :to="home.route">
          <svg class="app-icon icon fill-primary" viewBox="0 0 100 100" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
            <path d="M76.37,36.698c0,-9.812 -7.966,-17.778 -17.778,-17.778l-35.555,0c-9.812,0 -17.778,7.966 -17.778,17.778l-0,35.556c-0,9.812 7.966,17.778 17.778,17.778l35.555,-0c9.812,-0 17.778,-7.966 17.778,-17.778l0,-35.556Z" style="fill: rgba(0, 0, 0, 0.2);"/>
            <path d="M43.492,84.926l-35.66,-35.661l18.228,-18.229l17.369,17.37l35.538,-35.538l18.292,18.291l-53.767,53.767Z" />
          </svg>
        </b-navbar-item>

        <b-navbar-item
            tag="router-link"
            class="navbar__main"
            :to="home.route">
          <h1 class="is-size-4 navbar__main-title">
            <strong>
              {{ title }}
            </strong>
          </h1>

        </b-navbar-item>

        <b-button class="navbar__btn is-transparent"
                  @click="isOpen = !isOpen">
          <icOption class="fill-light" />
        </b-button>
      </template>
    </b-navbar>

    <navMenu :class="{ 'is-active': isOpen }"
             @close="isOpen = !isOpen">
    </navMenu>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import { TYPES, APP_VARS } from '../constants'
import navMenu from '../components/navMenu'
import icOption from '../assets/icons/ic_option'
import btnLogout1 from '../components/btnLogout'

export default {
  name: 'navbar',

  data () {
    return {
      home: TYPES.home,
      isOpen: false
    }
  },

  components: {
    icOption,
    navMenu
  },

  computed: {
    ...mapState({ mode: state => state.mode }),
    // ...mapState('user', ['isLoggedIn', 'user']),
    title () {
      if (this.mode.value === TYPES.project.value) return APP_VARS.name
      const storeOpened = this.$store.state.opened
      if (!storeOpened.value) return APP_VARS.name

      return storeOpened.value
    }
  },

  watch: {
    '$route'() {
      this.isOpen = false
    }
  },

  methods: {
    closeNavBar (input) {
      if (this.isOpen && !input) {
        this.isOpen = false
      }
    }
  }

}
</script>
