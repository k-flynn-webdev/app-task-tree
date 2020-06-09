<template>
  <div class="task__items"
       :class="status">

      <task
        v-for="task in tasks"
        :key="task.id"
        :task-data="task"
      />

  </div>
</template>

<script>
import status from '../constants/status.js'
import task from '../components/Task'

export default {
  name: 'TaskItems',
  components: {
    task
  },
  data () {
    return {
      status: status.CLEAR
    }
  },
  computed: {
    tasks: function () {
      return this.$store.getters['tasks/tasks']
    },
    project: function () {
      return this.$store.getters['projects/current']
    },
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  mounted () {
    this.$root.$on('PROJECT-CHANGE', this.getTasks)
  },
  methods: {
    getSearchType: function () {
      if (this.project.id !== -1) {
        return { project: this.project.id }
      }
      return { user: this.user.id }
    },
    getTasks: function () {
      const search = this.getSearchType()
      return this.$store.dispatch('tasks/getTasksByUserOrProject', search)
        .then(() => {
          this.status = status.CLEAR
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
