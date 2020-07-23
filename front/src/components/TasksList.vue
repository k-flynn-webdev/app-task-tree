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
    userOptions: function () {
      return this.$store.getters['user/options'].tasks
    },
    tasks: function () {
      if (!this.userOptions.showDone) {
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
    'userOptions.showDone': function (input, oldValue) {
      if (input === oldValue) return
      return this.getTasks()
    }
  },
  mounted () {
    if (!this.ready) return
    return this.getTasks()
  },
  methods: {
    getTasks: function () {
      if (this.project < 0) return
      if (this.taskHistory.project === this.project &&
        this.userOptions.showDone === this.taskHistory.showDone) {
        return
      }

      this.$store.commit('status', status.WAITING)
      this.$store.commit('tasks/taskHistory',
        { showDone: this.userOptions.showDone })
      if (this.taskHistory.project !== this.project) {
        this.$store.commit('tasks/taskSet', [])
      }

      const params = { project: this.project }
      if (!this.userOptions.showDone) params.showDone = false

      return this.$store.dispatch('tasks/getTasksByUserOrProject', params)
        .then(() => this.$store.commit('status', status.SUCCESS))
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
