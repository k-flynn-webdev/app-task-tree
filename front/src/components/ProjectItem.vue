<template>
  <div class="task__project__projects-list__item">

    <div class="flex-row">

      <div class="task__project__projects-list__item-status">
        <icTick v-if="data.isDone" />
        <icNone v-else />
      </div>

      <div class="task__project__projects-list__item-content flex-row">

        <p class="task__project__projects-list__item-progress">
          {{ renderProgress }}
        </p>

        <p class="task__project__projects-list__item-name flex-auto">
          {{ data.name }}
        </p>

        <p class="task__project__projects-list__item-updated">
          {{ renderDate }}
        </p>

      </div>

      <div class="task__project__projects-list__item-options">
        <button class="no-pad margin">
          <icOptions class="med" />
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
import icNone from '../assets/icons/ic_none'
import icTick from '../assets/icons/ic_tick'
import icOptions from '../assets/icons/ic_option'
// import status from '../constants/status.js'

export default {
  name: 'ProjectItem',
  components: {
    icNone,
    icTick,
    icOptions
  },
  props: {
    data: {
      type: Object,
      default: general.DEFAULT_PROJECT()
    }
  },
  computed: {
    renderProgress: function () {
      if (this.data.tasksDone < 1) return '0%'
      if (this.data.tasksTotal < 1) return '0%'
      return ((this.data.tasksDone / this.data.tasksTotal) * 100).toString() + '%'
    },
    renderDate: function () {
      return helpers.renderTime(this.data.updated)
    }
  },
  methods: {
    // renderProgress: function () {
    //   return ((this.data.tasksDone / this.data.tasksTotal) * 100) + '%'
    // }
  }
}
</script>
