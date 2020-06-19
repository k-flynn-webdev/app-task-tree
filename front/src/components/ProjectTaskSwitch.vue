<template>
  <div class="task__project__header__controls__switch">

    <button class="task__project__header__controls__switch-projects"
            :class="{ 'ACTIVE': value === modes.PROJECTS}"
            @click="$emit('input', modes.PROJECTS)">
      projects
    </button>

    <button class="task__project__header__controls__switch-tasks"
            :class="{ 'ACTIVE': value === modes.TASKS}"
            @click="$emit('input', modes.TASKS)">
      tasks
    </button>

  </div>
</template>

<script>
import modes from '../constants/modes'

export default {
  name: 'ProjectTaskSwitch',
  data () {
    return {
      modes: modes
    }
  },
  props: {
    value: {
      type: String,
      default: modes.CLEAR
    }
  }
}
</script>
