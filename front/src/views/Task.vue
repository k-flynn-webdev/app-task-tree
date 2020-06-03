<template>
  <div class="task">

    <div class="task__header">
      <div class="task__header__project">
        <p>project</p>
      </div>
      <div class="task__header__user">
        <p>user</p>
      </div>
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
import TaskInput from '../components/TaskInput.vue'

export default {
  name: 'Home',
  data () {
    return {
      userTest: 'token here'
    }
  },
  components: {
    TaskInput
  },
  methods: {
    postTest: function () {
      // return axios.get('/api/user/test',
      //   {
      //     headers:
      //       { Authorization: `Bearer ${this.userToken}` }
      //   })
    },
    postLogout: function () {
      // return axios.get('/api/user/logout',
      //   {
      //     headers:
      //       { Authorization: `Bearer ${this.userToken}` }
      //   })
    }
  }
}
</script>
