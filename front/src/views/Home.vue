<template>
  <div class="relative">

    <div class="task__project__header">

      <ProjectInfoName />

    </div>

    <div class="task__project__header__controls">

      <div class="flex-row">
        <ProjectTaskSwitch v-model="mode" />

        <UserInfoMini />
      </div>

      <InputBar :mode="mode" />

    </div>

    <RowStatus
      :is-done="test.isDone"
      :is-waiting="test.isWaiting"
      @click="testing" />

    <ProjectsList v-if="isProjects" @showTasks="showTasks" />

    <TasksList v-if="isTasks" />

  </div>
</template>

<script>
import modes from '../constants/modes'
import InputBar from '../components/InputBar'
import UserInfoMini from '../components/UserInfoMini'
import ProjectsList from '../components/ProjectsList'
import ProjectInfoName from '../components/ProjectInfoName'
import ProjectTaskSwitch from '../components/ProjectTaskSwitch'

import RowStatus from '../components/general/RowStatus'

import TasksList from '../components/TasksList'
import helpers from '../services/Helpers'

export default {
  name: 'Home',
  components: {
    InputBar,
    UserInfoMini,
    ProjectsList,
    ProjectInfoName,
    ProjectTaskSwitch,
    TasksList,
    RowStatus
  },
  data () {
    return {
      mode: modes.PROJECTS,
      test: {
        isWaiting: false,
        isDone: false
      }
    }
  },
  computed: {
    isProjects: function () {
      return this.mode === modes.PROJECTS
    },
    isTasks: function () {
      return this.mode === modes.TASKS
    }
  },
  methods: {
    showTasks: function () {
      this.mode = modes.TASKS
    },
    testing: function () {
      this.test.isWaiting = true

      helpers.timeDelay(() => {
        this.test.isWaiting = false
        this.test.isDone = !this.test.isDone
      }, 3000)
    }
  }
}
</script>
