<template>
  <div class="task__project__tasks-list relative no-overflow">

      <TaskItem
        v-for="item in tasksList"
        :key="item.id"
        :data="item"
        :selected="task.id === item.id"
      />

    <Card v-if="tasksList.length < 1" class="text-center">
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
import { mapGetters, mapState } from 'vuex'

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
    ...mapState(['ready']),
    ...mapState('tasks', ['task', 'tasks']),
    ...mapState('user', {
      user: state => state.user,
      sort: state => state.options.sort,
      showDone: state => state.options.tasks.showDone
    }),
    ...mapGetters('tasks',
      ['tasksNotDone', 'tasksDone']),
    tasksList: function () {
      if (!this.showDone) return this.tasksNotDone
      return this.tasks
    }
  },
  watch: {
    ready: 'fetchList',
    sort: 'fetchList',
    showDone: 'fetchList'
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
