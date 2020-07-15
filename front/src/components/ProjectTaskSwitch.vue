<template>
  <div class="task__project__header__controls__switch">

    <button class="task__project__header__controls__switch-projects"
            :class="{ 'ACTIVE': isProjects, 'DISABLED': !isEnabled }"
            @click="showProjects">
      <span>projects</span>
    </button>

    <button class="task__project__header__controls__switch-tasks"
            :class="{ 'ACTIVE': isTasks, 'DISABLED': !isEnabled }"
            @click="showTasks">
      <span>tasks</span>
    </button>

  </div>
</template>

<script>
import modes from '../constants/modes'
import Paths from '../constants/paths'

export default {
  name: 'ProjectTaskSwitch',
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    },
    isEnabled: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isTasks: function () {
      return this.mode === modes.TASKS
    },
    isProjects: function () {
      return this.mode === modes.PROJECTS
    },
    project: function () {
      return this.$store.getters['projects/current']
    }
  },
  methods: {
    showTasks: function () {
      if (this.isTasks) return

      this.$router.push({
        name: Paths.PROJECT_TASKS,
        params: {
          project: this.project.id
        }
      })
    },
    showProjects: function () {
      if (this.isProjects) return

      this.$router.push({
        name: Paths.PROJECTS
      })
    }
  }
}
</script>
