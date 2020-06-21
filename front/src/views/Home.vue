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

import TasksList from '../components/TasksList'

export default {
  name: 'Home',
  components: {
    InputBar,
    UserInfoMini,
    ProjectsList,
    ProjectInfoName,
    ProjectTaskSwitch,
    TasksList
  },
  data () {
    return {
      mode: modes.PROJECTS
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
    }
  }
}
</script>
