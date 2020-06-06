<template>
  <div class="task__items"
       :class="status">

    <p
      v-for="task in tasks"
      :key="task.id"
      class="task__items-text"
    >
      {{ task.value }}
    </p>

  </div>
</template>

<script>
import status from '../constants/status.js'

export default {
  name: 'TaskItems',
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
      const projectTmp = this.$store.getters['projects/current']
      if (projectTmp && projectTmp.id) return projectTmp.id
      return -1
    },
    user: function () {
      const userTmp = this.$store.getters['user/current']
      if (userTmp && userTmp.id) return userTmp.id
      return -1
    }
  },
  mounted () {
    this.status = status.WAITING

    let toGet = null
    if (this.project > -1) {
      toGet = { project: this.project }
    } else {
      toGet = { user: this.user }
    }

    return this.$store.dispatch('tasks/getTasksByUserOrProject', toGet)
      .then(() => {
        this.status = status.CLEAR
      })
      .catch(err => {
        this.status = status.ERROR
        this.$emit(status.ERROR, err)
        this.$store.commit('toasts/toastAdd', err)
      })
  }
}
</script>
