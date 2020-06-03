<template>
  <div class="task__input">
    <form>
      <div class="task__input__form">
        <input
          type="text"
          required
          class="task__input__form text"
          v-model="taskInput"
          v-on:submit.prevent="onSubmit"
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
import TaskService from '../services/TaskService.js'

export default {
  name: 'TaskInput',
  data () {
    return {
      taskInput: ''
    }
  },
  methods: {
    createTask: function () {
      const newTask = { user: 'anon', project: 'anon', value: this.taskInput }
      return TaskService.create(newTask)
    },
    onSubmit: function () {

    }
  }
}
</script>
