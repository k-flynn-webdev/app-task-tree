<template>
  <div class="is-relative">
    <div class="is-inline-block select-bar">
      <b-button class="is-size-7-tablet"
                ref="project"
                :class="{ 'is-primary': isProject }"
                :disabled="!projectBtnRoute"
                :loading="projectLoading"
                @click="loadPage(projectBtnRoute)">
        {{ TYPES.project.text }}
      </b-button>
      <b-button class="is-size-7-tablet"
                ref="plan"
                :class="{ 'is-primary': isPlan }"
                :disabled="!planBtnRoute"
                :loading="planLoading"
                @click="loadPage(planBtnRoute)">
        {{ TYPES.plan.text }}
      </b-button>
      <b-button class="is-size-7-tablet"
                ref="task"
                :class="{ 'is-primary': isTask }"
                :disabled="!taskBtnRoute"
                :loading="taskLoading"
                @click="loadPage(taskBtnRoute)">
        {{ TYPES.task.text }}
      </b-button>

      <div class="select-bar-highlight"
           :style="highlightStyle"></div>
    </div>
    <div class="select-bar-info">
      <span class="is-invisible-mobile">{{ mode.text }}: </span>
      <span>{{ totalItems }}</span>
    </div>
  </div>
</template>

<script>
import { TYPES } from '../constants'
import { get } from 'lodash-es'
const borderSize = 2;
const paddingRight = 10;

export default {
  name: 'selectBar',

  data () {
    return {
      TYPES,
      styles: {
        project: { width: 100 },
        plan: { width: 100 },
        task: { width: 100 }
      }
    }
  },

  computed: {
    highlightStyle () {
      if (this.isProject) {
        return {
          left: (0 + borderSize) + 'px',
          width: (this.styles.project.width +
              paddingRight ) + 'px'
        }
      }
      if (this.isPlan) {
        return {
          left: (this.styles.project.width +
              (borderSize * 2)) + 'px',
          width: (this.styles.plan.width +
              paddingRight) + 'px'
        }
      }
      if (this.isTask) {
        return {
          left: (this.styles.project.width +
              this.styles.plan.width  +
              (borderSize * 2)) + 'px',
          width: (this.styles.task.width +
              paddingRight) + 'px'
        }
      }
    },
    totalItems () {
      if (this.mode &&
          this.$store.state[this.mode.store]) {
        return this.$store.state[this.mode.store].total
      }

      return 0
    },
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

    projectLoading () {
      return this.$store.state[TYPES.project.store].loading
    },
    planLoading () {
      return this.$store.state[TYPES.plan.store].loading
    },
    taskLoading () {
      return this.$store.state[TYPES.task.store].loading
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

  mounted () {
    this.getSelectBarStyles()
  },

  methods: {
    loadPage (page) {
      this.$router.push(page)
    },
    /**
     * Setup initial computed styling
     *    widths for the select bar effect
     * 
     * @returns {void}
     */
    getSelectBarStyles () {
      ;['project', 'plan', 'task'].forEach(item => {
        this.styles[item].width = this.$refs[item].$el.clientWidth
      })
    }
  }
}
</script>
