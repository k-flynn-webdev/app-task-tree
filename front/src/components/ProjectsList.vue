<template>
  <div class="task__project__projects-list relative no-overflow">

      <ProjectItem
        v-for="item in projects"
        :key="item.id"
        :data="item"
        :selected="project.id === item.id"
      />

    <Card v-if="projects.length < 1"
          class="text-center">
      <p class="hint">
        Start by creating a new project to add tasks to
      </p>
    </Card>

  </div>
</template>

<script>
import Card from '../components/general/Card'
import ProjectItem from '../components/ProjectItem'
import status from '../constants/status'
import helpers from '../services/Helpers'
import general from '../constants/general'

export default {
  name: 'ProjectsList',
  components: {
    Card,
    ProjectItem
  },
  computed: {
    ready: function () {
      return this.$store.getters.ready
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    userOptions: function () {
      return this.$store.getters['user/options'].projects
    },
    project: function () {
      return this.$store.getters['projects/current']
    },
    projects: function () {
      if (!this.userOptions.showDone) {
        return this.$store.getters['projects/projectsNotDone']
      }
      return this.$store.getters['projects/projects']
    },
    projectHistory: function () {
      return this.$store.getters['projects/projectHistory']
    }
  },
  watch: {
    ready: function (input) {
      if (input) this.getProjects()
    },
    'userOptions.showDone': function (input, oldValue) {
      if (input === oldValue) return
      this.getProjects()
    }
  },
  mounted () {
    if (!this.ready) return
    return this.getProjects()
  },
  methods: {
    getProjects: function () {
      if (this.user.id < 0) return
      if (this.projectHistory.user === this.user.id &&
        this.userOptions.showDone === this.projectHistory.showDone) {
        return
      }

      this.$store.commit('status', status.WAITING)
      this.$store.commit('projects/projectHistory',
        { showDone: this.userOptions.showDone })
      if (this.projectHistory.user !== this.user.id) {
        this.$store.commit('projects/projectSet', [])
      }

      const params = { user: this.user.id }
      if (!this.userOptions.showDone) params.showDone = false

      return this.$store.dispatch('projects/getProjectsByUserId',
        params)
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
