<template>
  <div class="task__project__projects-list__item"
       :class="status">

    <div class="task__project__projects-list__item-status text-left">
      <icTick v-if="data.isDone" class="xs"
              :class="{ 'DISABLED': !selected }"/>
      <icNone v-else class="xs"
              :class="{ 'DISABLED': !selected }"/>
    </div>

    <div class="task__project__projects-list__item-content flex-row">

      <p class="task__project__projects-list__item-progress text-left">
        {{ progress }}
      </p>

      <p class="task__project__projects-list__item-name flex-auto">
        {{ data.name }}
      </p>

      <p class="task__project__projects-list__item-updated text-right">
        {{ date }}
      </p>

    </div>

    <div class="task__project__projects-list__item-options text-right">
      <button class="no-margin">
        <icOptions class="sm" />
      </button>
    </div>

  </div>
</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
import icRound from '../assets/icons/ic_round'
import icTick from '../assets/icons/ic_tick'
import icOptions from '../assets/icons/ic_option'
import status from '../constants/status.js'

export default {
  name: 'ProjectItem',
  components: {
    icNone: icRound,
    icTick,
    icOptions
  },
  props: {
    data: {
      type: Object,
      default: general.DEFAULT_PROJECT()
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      status: status.CLEAR
    }
  },
  computed: {
    progress: function () {
      return helpers.renderProgressNum(this.data.tasksDone, this.data.tasksTotal)
    },
    date: function () {
      return helpers.renderTime(this.data.updated)
    }
  },
  methods: {
  }
}
</script>
