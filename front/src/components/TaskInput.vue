<template>
  <div class="task__input">
    <form @submit.prevent="createTask">
      <div class="task__input__form">
        <input
          type="text"
          required
          class="task__input__form text"
          v-model="input"
          :class="status"
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
const TASK_ERROR = 'TASK-ERROR'
const TASK_SUCCESS = 'TASK-SUCCESS'

export default {
  name: 'TaskInput',
  data () {
    return {
      status: '',
      input: '',
      project: {
        id: -1
      },
      user: {
        id: -1
      }
    }
  },
  computed: {
    isValid: function () {
      return this.input.length > 5
    }
  },
  methods: {
    resetStatus: function () {
      const self = this
      setTimeout(function () {
        self.status = ''
      }, 2 * 1000)
    },
    createTask: function () {
      if (!this.isValid) return

      const newTask = { user: -1, project: -1, value: this.input }
      return this.$store.dispatch('tasks/create', newTask)
        .then(task => {
          this.$emit(TASK_SUCCESS, task)
          this.status = TASK_SUCCESS
          this.resetStatus()
        })
        .catch(err => {
          this.$emit(TASK_ERROR, err)
          this.status = TASK_ERROR
          this.resetStatus()
        })
    }
  }
}
</script>
