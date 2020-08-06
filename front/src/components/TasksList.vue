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
import status from '../constants/status.js'
import Card from '../components/general/Card'
import TaskItem from '../components/TaskItem'

export default {
  name: 'TasksList',
  components: {
    Card,
    TaskItem
  },
  props: {
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
    userOptions: function () {
      return this.$store.getters['user/options']
    },
    tasks: function () {
      if (!this.userOptions.tasks.showDone) {
        return this.$store.getters['tasks/tasksNotDone']
      }
      return this.$store.getters['tasks/tasks']
    },
    taskHistory: function () {
      return this.$store.getters['tasks/taskHistory']
    }
  },
  watch: {
    ready: function (input) {
      if (input) this.getTasks()
    },
    'userOptions.tasks.showDone': function (input, oldValue) {
      if (input === oldValue) return
      this.getTasks()
    },
    'userOptions.sort': function (input, oldValue) {
      if (input === oldValue) return
      this.getTasks()
    }
  },
  mounted () {
    if (!this.ready) return
    return this.getTasks()
  },
  methods: {
    getParams: function () {
      return {
        user: this.user.id,
        showDone: !this.userOptions.tasks.showDone ? false : undefined,
        sortAsc: this.userOptions.sort.asc ? true : undefined,
        sortType: this.userOptions.sort.type,
        project: this.project
      }
    },
    getTasks: function () {
      if (this.user.id < 0) return

      // update store with last request
      this.$store.commit('tasks/taskHistory',
        { showDone: this.userOptions.tasks.showDone })

      // empty store if user changed ..
      if (this.taskHistory.user !== this.user.id) {
        this.$store.commit('tasks/taskSet', [])
      }

      return this.$store.dispatch('tasks/getTasksByUserOrProject',
        this.getParams())
        .catch(err => this.handleError(err, this.getTasks))
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
