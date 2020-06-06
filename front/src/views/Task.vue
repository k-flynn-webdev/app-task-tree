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

    <TaskItems />

  </div>
</template>

<script>
import User from '../components/User.vue'
import Project from '../components/Project.vue'
import TaskInput from '../components/TaskInput.vue'
import TaskItems from '../components/TaskItems.vue'

export default {
  name: 'Home',
  components: {
    User,
    Project,
    TaskInput,
    TaskItems
  },

  data () {
    return {
      userTest: 'token here'
    }
  }
}
</script>
