<template>

  <div class="settings">

    <button class="settings__btn"
            :class="{ 'is-close': value }"
            @click="toggle">
      <icOptions v-if="!value" class="icon-90" />
      <icClose v-else class="icon-90 fill-bg" />
    </button>

    <div v-if="value"
         class="settings__fullscreen-click"
         @click="toggle"></div>

    <div v-if="value" class="settings__holder">
     <ul>
       <li v-if="!isLoggedIn" @click="toggle">
         <router-link
           to="/user/create">
           Create
         </router-link>
       </li>
       <li v-if="!isLoggedIn" @click="toggle">
         <router-link
           to="/user/login">
           Login
         </router-link>
       </li>
       <li v-if="isLoggedIn">
         <div class="button" @click="logout">
           Logout
         </div>
       </li>
     </ul>
    </div>
  </div>

</template>

<script>
import Paths from '../constants/paths'
import status from '../constants/status'
import helpers from '../services/Helpers'
import general from '../constants/general'
import icClose from '../assets/icons/ic_cross'
import icOptions from '../assets/icons/ic_option'

export default {
  name: 'AppSettings',
  components: {
    icClose,
    icOptions
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    isLoggedIn: function () {
      return this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    toggle: function () {
      this.$emit('input', !this.value)
    },
    logout: function () {
      return this.$store.dispatch('user/logout')
        .then(res => this.handleSuccess(res))
        .catch(err => this.handleError(err))
    },
    handleSuccess: function () {
      helpers.timeDelay(() => {
        this.toggle()
        this.$router.push({ name: Paths.HOME })
      }, general.DELAY_SUCCESS)
    },
    handleError: function (err) {
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
