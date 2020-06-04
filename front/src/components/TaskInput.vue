<template>
  <div class="task__input"
       :class="status"
  >
    <form @submit.prevent="createTask">
      <div class="task__input__form">
        <input
          type="text"
          required
          class="task__input__form text"
          v-model="task.value"
          @submit.prevent="createTask"
        />
        <div class="task__input__form__send">
          <button
            type="button"
            @click="createTask">
            send
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
const ERROR = 'ERROR'
const SUCCESS = 'SUCCESS'
const WAITING = 'WAITING'
const CLEAR = ''

export default {
  name: 'TaskInput',
  data () {
    return {
      status: CLEAR,
      statusTimer: null,
      task: {
        value: '',
        project: -1,
        user: -1
      }
    }
  },
  computed: {
    isValid: function () {
      return this.task.value.length > 5
    }
  },
  methods: {
    resetStatus: function () {
      clearTimeout(this.statusTimer)

      const self = this
      this.statusTimer =
        setTimeout(function () {
          self.status = CLEAR
        }, 2 * 1000)
    },
    createTask: function () {
      if (!this.isValid) return
      if (this.status === WAITING) return

      this.status = WAITING

      const newTask = {
        user: this.task.user,
        project: this.task.project,
        value: this.task.value
      }

      return this.$store.dispatch('tasks/create', newTask)
        .then(task => {
          this.$emit(SUCCESS, task)
          this.status = SUCCESS
          this.resetStatus()
        })
        .catch(err => {
          this.$emit(ERROR, err)
          this.$store.commit('toasts/toastAdd', err)
          this.status = ERROR
          this.resetStatus()
        })
    }
  }
}
</script>
