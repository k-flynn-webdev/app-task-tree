<template>
  <div class="task__input"
       :class="status">
    <form @submit.prevent="createTask">
      <div class="task__input__form">
        <input
          type="text"
          required
          class="task__input__form text"
          v-model="text"
          @submit.prevent="createTask"
        />
        <button
          class="task__input__form__send"
          type="button"
          @click="createTask">
          send
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import status from '../constants/status.js'

export default {
  name: 'TaskInput',
  data () {
    return {
      status: status.CLEAR,
      statusTimer: null,
      text: status.CLEAR
    }
  },
  computed: {
    isValid: function () {
      return this.text.length > 4
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
  methods: {
    resetStatus: function () {
      clearTimeout(this.statusTimer)

      const self = this
      this.statusTimer =
        setTimeout(function () {
          self.status = status.CLEAR
        }, 2 * 1000)
    },
    createTask: function () {
      if (!this.isValid) return
      if (this.status !== status.CLEAR) return
      if (this.status === status.WAITING) return

      this.status = status.WAITING

      const newTask = {
        text: this.text,
        project: this.project,
        user: this.user
      }

      return this.$store.dispatch('tasks/create', newTask)
        .then(task => {
          this.$emit(status.SUCCESS, task)
          this.status = status.SUCCESS
          this.text = status.CLEAR
          this.resetStatus()
        })
        .catch(err => {
          this.$emit(status.ERROR, err)
          this.$store.commit('toasts/toastAdd', err)
          this.status = status.ERROR
          this.resetStatus()
        })
    }
  }
}
</script>
