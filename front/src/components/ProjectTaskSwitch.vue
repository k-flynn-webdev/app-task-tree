<template>
  <div class="task__project__header__controls__switch">

    <button class="task__project__header__controls__switch-projects"
            :class="{ 'ACTIVE': isProjects}"
            @click="showProjects">
      projects
    </button>

    <button class="task__project__header__controls__switch-tasks"
            :class="{ 'ACTIVE': isTasks}"
            @click="showTasks">
      tasks
    </button>

  </div>
</template>

<script>
import modes from '../constants/modes'

export default {
  name: 'ProjectTaskSwitch',
  props: {
    value: {
      type: String,
      default: modes.CLEAR
    }
  },
  computed: {
    isTasks: function () {
      return this.value === modes.TASKS
    },
    isProjects: function () {
      return this.value === modes.PROJECTS
    }
  },
  methods: {
    showTasks: function () {
      this.$emit('input', modes.TASKS)
    },
    showProjects: function () {
      this.$emit('input', modes.PROJECTS)
    }
  }
}
</script>
