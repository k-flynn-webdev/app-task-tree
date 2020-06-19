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
