<template>
  <div class="task__project__tasks-list relative no-overflow">

      <TaskItem
        v-for="item in tasks"
        :key="item.id"
        :data="item"
      />

    <Card v-if="tasks.length < 1" class="text-center">
      <p v-if="project.id >= 0"
         class="hint"> Add a new task
      </p>
      <p v-else class="hint">
        First you need to create a project to add tasks to
      </p>
    </Card>

  </div>
</template>

<script>
import { get } from 'lodash-es'
import TaskMixin from '../mixins/TaskMixin'
import status from '../constants/status.js'
import Card from '../components/general/Card'
import TaskItem from '../components/TaskItem'

export default {
  name: 'TasksList',
  components: {
    Card,
    TaskItem
  },
  mixins: [TaskMixin],
  props: {
    project: {
      type: Number,
      default: -1
    }
  },
  computed: {
    ready () {
      return this.$store.state.ready
    },
    tasks: function () {
      if (!this.userOptions.tasks.showDone) {
        return this.$store.getters['tasks/tasksNotDone']
      }
      return this.$store.getters['tasks/tasks']
    },
    user: function () {
      return this.$store.getters['user/user']
    },
    userOptions: function () {
      return this.$store.getters['user/options']
    }
  },
  watch: {
    ready: 'fetchList',
    'userOptions.sort': 'fetchList',
    'userOptions.tasks.showDone': 'fetchList'
  },
  created () {
    if (this.ready) this.fetchList()
  },
  methods: {
    /**
     * Fetch Projects list from API on request/change
     */
    fetchList () {
      const params = this.createParams({ project: this.project })
      return this.getTasks(params)
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
