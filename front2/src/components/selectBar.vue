<template>
  <div class="is-flex">
    <b-button :disabled="!projectBtnRoute"
              @click="loadPage(projectBtnRoute)">
      {{ TYPES.project.text }}
    </b-button>
    <b-button :disabled="!planBtnRoute"
              @click="loadPage(planBtnRoute)">
      {{ TYPES.plan.text }}
    </b-button>
    <b-button :disabled="!taskBtnRoute"
              @click="loadPage(taskBtnRoute)">
      {{ TYPES.task.text }}
    </b-button>
  </div>

</template>

<script>
import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'selectBar',

  data () {
    return {
      TYPES
    }
  },

  computed: {
    mode () {
      return this.$store.state.mode
    },
    hasQuery () {
      return this.$store.state.query
    },
    opened () {
      return this.$store.state.opened
    },
    current () {
      return this.$store.state[this.mode.store].current
    },
    hasSelected () {
      return !!(this.current && this.current.id > 0)
    },

    isProject () {
      return (this.mode.value === TYPES.project.value)
    },
    isPlan () {
      return (this.mode.value === TYPES.plan.value)
    },
    isTask () {
      return (this.mode.value === TYPES.task.value)
    },

    projectBtnRoute () {
      if (this.isProject) {
        return {
          name: TYPES.project.route.name,
        }
      }

      if (this.isPlan) {
        return {
          name: TYPES.project.route.name
        }
      }

      if (this.isTask) {
        return {
          name: TYPES.project.route.name
        }
      }
    },
    planBtnRoute () {
      if (this.isProject) {
        if (this.hasSelected) {
          return {
            name: TYPES.plan.route.name,
            query: { project: this.current.id }
          }
        }

        return null
      }

      if (this.isPlan) {
        return {
          name: TYPES.plan.route.name,
          query: this.query
        }
      }

      if (this.isTask) {
        return {
          name: TYPES.plan.route.name,
          query: { project: this.opened.project }
        }
      }
    },
    taskBtnRoute () {
      if (this.isProject) {
        return null
      }

      if (this.isPlan) {
        if (this.hasSelected) {
          return {
            name: TYPES.task.route.name,
            query: { plan: this.current.id }
          }
        }

        return null
      }

      if (this.isTask) {
        return {
          name: TYPES.task.route.name,
          query: this.query
        }
      }
    },
  },

  methods: {
    loadPage (page) {
      this.$router.push(page)
    }
  }
}
</script>
