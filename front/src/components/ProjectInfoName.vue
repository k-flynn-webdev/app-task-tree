<template>
  <div class="task__project__header__info"
      title="click to toggle between % or total"
      @click="showTotals = !showTotals">
    <p class="task__project__header__info-name name text-bold">
      {{ project.name }}
    </p>
    <p class="task__project__header__info-count text-bold">
      {{ progress }}
    </p>
  </div>
</template>

<script>
import helpers from '../services/Helpers'

export default {
  name: 'ProjectInfoName',
  data () {
    return {
      showTotals: true
    }
  },
  computed: {
    project: function () {
      return this.$store.getters['projects/current']
    },
    progress: function () {
      if (!this.showTotals) {
        return helpers.renderProgressPercent(this.project)
      }

      return helpers.renderProgressNum(this.project)
    }
  }
}
</script>
