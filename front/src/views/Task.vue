<template>
  <div class="task">

    <div class="task__header">
      <Project />
      <User />
      <div class="task__header__option">
        <p>option</p>
      </div>
    </div>

    <TaskInput />

    <div class="task__timer"></div>

    <div class="task__items">
      <div class="task__items__item">
        <p class="task__items__task-text">
          task info here
        </p>
        <p class="task__items__task-isDone">
          isDone?
        </p>
      </div>
    </div>

  </div>
</template>

<script>
import User from '../components/User.vue'
import Project from '../components/Project.vue'
import TaskInput from '../components/TaskInput.vue'

export default {
  name: 'Home',
  components: {
    User,
    Project,
    TaskInput
  },
  data () {
    return {
      userTest: 'token here'
    }
  },
  methods: {
  }
}
</script>
