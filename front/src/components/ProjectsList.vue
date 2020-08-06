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
import { get } from 'lodash-es'
import Card from '../components/general/Card'
import ProjectItem from '../components/ProjectItem'
import status from '../constants/status'

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
      return this.$store.getters['user/options']
    },
    project: function () {
      return this.$store.getters['projects/current']
    },
    projects: function () {
      if (!this.userOptions.projects.showDone) {
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
    'userOptions.projects.showDone': function (input, oldValue) {
      if (input === oldValue) return
      this.getProjects()
    },
    'userOptions.sort': function (input, oldValue) {
      if (input === oldValue) return
      this.getProjects()
    }
  },
  mounted () {
    if (!this.ready) return
    return this.getProjects()
  },
  methods: {
    getParams: function () {
      return {
        user: this.user.id,
        showDone: !this.userOptions.projects.showDone ? false : undefined,
        sortAsc: this.userOptions.sort.asc ? true : undefined,
        sortType: this.userOptions.sort.type
      }
    },
    getProjects: function () {
      if (this.user.id < 0) return

      // update store with last request
      this.$store.commit('projects/projectHistory',
        { showDone: this.userOptions.projects.showDone })

      // empty store if user changed ..
      if (this.projectHistory.user !== this.user.id) {
        this.$store.commit('projects/projectSet', [])
      }

      return this.$store.dispatch('projects/getProjectsByUserId',
        this.getParams())
        .catch(err => this.handleError(err, this.getProjects))
    },
    /**
     * Handle error response
     * @param {error}     err       error from response
     * @param {function}  cbRetry   function that the error arose from
     */
    handleError: function (err, cbRetry) {
      const errStatus = get(err, 'response.status')
      if (errStatus && errStatus === 401 && this.$store.getters['user/isAnon']) {
        if (!cbRetry) return
        return cbRetry()
      }

      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)
    }
  }
}
</script>
