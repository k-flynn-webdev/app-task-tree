<template>

  <div class="settings">

    <button v-if="!value"
            class="settings__btn"
            title="settings"
            @click="toggle">
      <icOptions class="icon-90" />
    </button>

    <div v-if="value"
         class="settings__fullscreen-click"
         @click="toggle"></div>

    <div v-if="value" class="settings__holder">

      <button class="settings__btn is-close"
              title="settings"
              @click="toggle">
        <icClose class="icon-90 fill-bg" />
      </button>

     <ul>

       <li class="label">User</li>

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
         <button class="button"
                 title="Logout"
                 @click="logout">
           Logout
         </button>
       </li>

       <li class="label">Projects</li>

       <li>
         <label class="show-label clickable">

           <span class="color-bg text-bold">Show Done</span>

           <input type="checkbox"
                  :value="userOptions.projects.showDone"
                  @click="toggleProjectsShowDone">

           <div class="display-inline-b align-middle">
             <icDone :class="[userOptions.projects.showDone?'fill-bg':'fill-mid alpha']"/>
           </div>

         </label>
       </li>

       <li class="label">Tasks</li>

       <li>
         <label class="show-label clickable">

           <span class="color-bg text-bold">Show Done</span>

           <input type="checkbox"
                  :value="userOptions.tasks.showDone"
                  @click="toggleTasksShowDone">

           <div class="display-inline-b align-middle">
             <icDone :class="[userOptions.tasks.showDone?'fill-bg':'fill-mid alpha']"/>
           </div>

         </label>
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
import icDone from '../assets/icons/ic_tick'
import icClose from '../assets/icons/ic_cross'
import icOptions from '../assets/icons/ic_option'

export default {
  name: 'AppSettings',
  components: {
    icDone,
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
    userOptions: function () {
      return this.$store.getters['user/options']
    },
    isLoggedIn: function () {
      return this.$store.getters['user/isLoggedIn']
    }
  },
  methods: {
    toggleProjectsShowDone: function () {
      const newOption = { projects: { showDone: !this.userOptions.projects.showDone } }
      this.$store.commit('user/options', newOption)
    },
    toggleTasksShowDone: function () {
      const newOption = { tasks: { showDone: !this.userOptions.tasks.showDone } }
      this.$store.commit('user/options', newOption)
    },
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
