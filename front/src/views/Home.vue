<template>
  <div class="relative">

    <Header
      :mode="mode"
      :user="user"
      :valid-user="validUser" />

    <router-view />

  </div>
</template>

<script>
import modes from '../constants/modes'
import Header from '../components/Header'
import status from '../constants/status'
import helpers from '../services/Helpers'
import general from '../constants/general'

export default {
  name: 'Home',
  components: {
    Header
  },
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    },
    project: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ready: function () {
      return this.$store.getters.ready
    },
    validUser: function () {
      return !(this.user.id === null || this.user.id < 0)
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    userOptions: function () {
      return this.$store.getters['user/options'].projects
    }
  },
  watch: {
    ready: function (input) {
      if (input) this.setProjectName()
    },
    'userOptions.showDone': function (input, oldValue) {
      if (input === oldValue) return
      this.getUserProjects(false)
    }
  },
  mounted () {
    if (!this.ready) return
    if (this.mode === modes.CLEAR) return
    return this.setProjectName()
  },
  methods: {
    setProjectName: function () {
      if (!this.project) return
      const projectStore = this.$store.getters['projects/current']
      if (projectStore.id !== this.project) {
        const projectFound =
          this.$store.getters['projects/findProject'](this.project)
        if (projectFound.id < 0) return
        this.$store.commit('projects/projectCurrent', projectFound)
      }
    },
    getUserProjects: function (resetArray = true) {
      this.$store.commit('status', status.WAITING)
      const params = { user: this.user.id }
      if (!this.userOptions.showDone) params.showDone = false

      return this.$store.dispatch('projects/getProjectsByUserId',
        [params, resetArray])
        .then(() => {
          helpers.timeDelay(() => {
            this.$store.commit('status', status.SUCCESS)
          }, general.DELAY_BLIP)
        })
        .catch(err => this.handleError(err))
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }

  }
}
</script>
