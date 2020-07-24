<template>
  <div class="task__project__header__info"
      title="click to toggle between % or total"
      @click="showTotals = !showTotals">
    <p class="task__project__header__info-name name text-bold">
      {{ projectName }}
    </p>
    <p class="task__project__header__info-count text-bold">
      {{ progress }}
    </p>
  </div>
</template>

<script>
import modes from '../constants/modes'
import helpers from '../services/Helpers'

export default {
  name: 'ProjectInfoName',
  data () {
    return {
      showTotals: true
    }
  },
  props: {
    mode: {
      type: String,
      default: modes.CLEAR
    }
  },
  computed: {
    ready: function () {
      return this.$store.getters.ready
    },
    project: function () {
      return this.$store.getters['projects/current']
    },
    showName: function () {
      return (this.mode !== modes.CLEAR &&
        this.ready &&
        this.project)
    },
    projectName: function () {
      if (!this.showName) return 'MiniTask ..'
      return this.project.name
    },
    progress: function () {
      if (!this.showName) return
      if (!this.showTotals) {
        return helpers.renderProgressPercent(this.project)
      }

      return helpers.renderProgressNum(this.project)
    }
  }
}
</script>
