<template>
  <div class="task__project__tasks-list no-overflow">

     <transition-group name="list-anim" tag="ul">

      <TaskItem
        v-for="item in tasks"
        :key="item.id"
        :data="item"
        :selected="task.id === item.id"
      />

    </transition-group>

    <div v-if="project.id < 0"
         class="text-center">
      <p class="break-word"> No Project found for account </p>
      <p class="break-word"> Create a project first before creating a task </p>
    </div>

    <div v-if="project.id >= 0 && tasks.length < 1"
         class="text-center">
      <p class="break-word"> No Tasks found for this project </p>
      <p class="break-word"> Create a task by typing in a description above </p>
    </div>

  </div>
</template>

<script>
import status from '../constants/status.js'
import TaskItem from '../components/TaskItem'

export default {
  name: 'TasksList',
  components: {
    TaskItem
  },
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    },
    task: function () {
      return this.$store.getters['tasks/current']
    },
    tasks: function () {
      return this.$store.getters['tasks/tasks']
    }
  },
  mounted () {
    return this.getTasksOfProject()
  },
  methods: {
    getTasksOfProject: function () {
      return this.$store.dispatch('tasks/getTasksByUserOrProject',
        { project: this.project.id })
        .then(res => {
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
