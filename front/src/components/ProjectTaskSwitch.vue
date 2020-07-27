<template>
  <div class="task__project__header__controls__switch">

    <button class="task__project__header__controls__switch-projects"
            :tabindex="[ allowInput && !isProjects? 0: -1 ]"
            :class="{ 'ACTIVE': isProjects, 'DISABLED': !isEnabled, 'HIGHLIGHT': highLight }"
            @click="showProjects">
      projects
    </button>

    <button class="task__project__header__controls__switch-tasks"
            :tabindex="[ allowInput && isProjects? 0: -1 ]"
            :class="{ 'ACTIVE': isTasks, 'DISABLED': !isEnabled }"
            @click="showTasks">
      tasks
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
    highLight: function () {
      return (this.$route.name === Paths.HOME && this.hasUser)
    },
    hasUser: function () {
      return this.$store.getters['user/user'].id !== -1
    },
    allowInput: function () {
      return (this.isEnabled)
    },
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
      if (this.project && this.project.id) {
        this.$router.push({
          name: Paths.PROJECT_TASKS,
          params: {
            project: this.project.id
          }
        })
      }
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
