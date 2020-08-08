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

           <span class="display-inline-b align-middle hover">
             <icDone :class="[userOptions.projects.showDone?'fill-bg':'fill-mid alpha']"/>
           </span>

         </label>
       </li>

       <li class="label">Tasks</li>

       <li>
         <label class="show-label clickable">

           <span class="color-bg text-bold">Show Done</span>

           <input type="checkbox"
                  :value="userOptions.tasks.showDone"
                  @click="toggleTasksShowDone">

           <span class="display-inline-b align-middle hover">
             <icDone :class="[userOptions.tasks.showDone?'fill-bg':'fill-mid alpha']"/>
           </span>

         </label>
       </li>

       <li class="label">Sort</li>

       <li
        v-for="(sortRow, idx) in sortArray"
        class="li-min"
        :key="idx">

          <label
            v-for="(item, idx2) in sortRow"
            :key="item"
            class="show-label clickable"
            :class="{ 'label-right': idx2 > 0}"
            @click="toggleSort(item)"
          >
            <span
              class="color-bg text-bold name"
              :class="{ 'alpha': currentSort !== item }">
              {{ item }}
            </span>

           <span
             v-if="currentSort === item"
             class="display-inline-b align-middle settings__holder__sort-item-arrow"
           >
             <icLeft
              class="fill-bg transition-slow"
              :class="[ userOptions.sort.asc? 'rot-90' : 'rot-270' ]"
             />
           </span>

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
import icLeft from '../assets/icons/ic_left'

const SORT_TYPES = ['created', 'updated', 'done', 'scale']

export default {
  name: 'AppSettings',
  components: {
    icLeft,
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
    sortArray () {
      const rows = []
      for (let row = 0; row < SORT_TYPES.length; row += 2) {
        rows.push([SORT_TYPES[row], SORT_TYPES[row + 1]])
      }
      return rows
    },

    userOptions: function () {
      return this.$store.getters['user/options']
    },
    isLoggedIn: function () {
      return this.$store.getters['user/isLoggedIn']
    },
    currentSort: function () {
      return this.userOptions.sort.type
    }
  },
  methods: {
    toggle: function () {
      this.$emit('input', !this.value)
    },
    toggleProjectsShowDone: function () {
      this.$store.commit('user/options',
        { projects: { showDone: !this.userOptions.projects.showDone } })
    },
    toggleTasksShowDone: function () {
      this.$store.commit('user/options',
        { tasks: { showDone: !this.userOptions.tasks.showDone } })
    },
    toggleSort: function (type) {
      let sortAsc = true
      if (type === this.currentSort) {
        sortAsc = !this.userOptions.sort.asc
      }

      this.$store.commit('user/options',
        { sort: { asc: sortAsc, type } })
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
      this.$router.push({ name: Paths.HOME })
    }
  }
}
</script>
