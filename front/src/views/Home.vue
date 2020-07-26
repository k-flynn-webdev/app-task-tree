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
    user: function () {
      return this.$store.getters['user/user']
    },
    validUser: function () {
      return !(this.user.id === null || this.user.id < 0)
    }
  },
  watch: {
    ready: function (input) {
      if (input) this.setProjectName()
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
      if (!this.projectStore) return
      if (projectStore.id !== this.project) {
        const projectFound =
          this.$store.getters['projects/findProject'](this.project)
        if (!projectFound || projectFound.id < 0) return
        this.$store.commit('projects/projectCurrent', projectFound)
      }
    }
  }
}
</script>
