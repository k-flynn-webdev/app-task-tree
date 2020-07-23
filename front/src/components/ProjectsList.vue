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
import helpers from '../services/Helpers'
import status from '../constants/status'
import general from '../constants/general'

export default {
  name: 'ProjectsList',
  components: {
    Card,
    ProjectItem
  },
  watch: {
    'userOptions.showDone': function () {
      this.getUserProjects(false)
    }
  },
  computed: {
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
    }
  },
  methods: {
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
