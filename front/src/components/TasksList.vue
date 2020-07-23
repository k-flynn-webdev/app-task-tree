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
    userOptions: function () {
      return this.$store.getters['user/options'].tasks
    },
    ready: function () {
      return this.$store.getters.ready
    },
    taskProject: function () {
      return this.$store.getters['tasks/taskProject']
    },
    task: function () {
      return this.$store.getters['tasks/current']
    },
    tasks: function () {
      if (!this.userOptions.showDone) {
        return this.$store.getters['tasks/tasksNotDone']
      }
      return this.$store.getters['tasks/tasks']
    }
  },
  watch: {
    ready: function (input) {
      if (input) this.getTasksOfProject()
    },
    'userOptions.showDone': function (input, oldValue) {
      if (input === oldValue) return
      return this.getTasksOfProject(false)
    }
  },
  mounted () {
    if (!this.ready) return
    return this.getTasksOfProject()
  },
  methods: {
    getTasksOfProject: function (resetArray = true) {
      if (this.taskProject === this.project && resetArray) return

      this.$store.commit('status', status.WAITING)
      if (resetArray) {
        this.$store.commit('tasks/taskSet', [])
      }

      const params = {
        project: this.project
      }
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
