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
import status from '../constants/status'
import Card from '../components/general/Card'
import ProjectMixin from '../mixins/ProjectMixin'
import ProjectItem from '../components/ProjectItem'

export default {
  name: 'ProjectsList',
  components: {
    Card,
    ProjectItem
  },
  mixins: [ProjectMixin],
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    },
    projects: function () {
      if (!this.userOptions.projects.showDone) {
        return this.$store.getters['projects/projectsNotDone']
      }
      return this.$store.getters['projects/projects']
    },
    userOptions: function () {
      return this.$store.getters['user/options']
    }
  },
  watch: {
    'userOptions.sort': 'fetchList',
    'userOptions.projects.showDone': 'fetchList'
  },
  methods: {
    /**
     * Fetch Projects list from API on request/change
     */
    fetchList () {
      const params = this.createParams()
      return this.getProjects(params)
        .catch(err => this.handleError(err, this.fetchList))
    },
    /**
     * Handle error response
     * @param {error}     err       error from response
     * @param {function}  cbRetry   function that the error arose from
     */
    handleError: function (err, cbRetry) {
      const errStatus = get(err, 'response.status')
      if (errStatus && errStatus === 401 &&
        this.$store.getters['user/isAnon'] &&
        cbRetry) {
        return cbRetry()
      }

      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)

      throw err
    }
  }
}
</script>
