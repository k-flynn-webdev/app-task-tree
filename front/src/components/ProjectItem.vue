<template>

  <div :class="status">
    <div class="task__project__projects-list__item"
      @click="onSelectProject">

      <div class="task__project__projects-list__item-status text-left">
        <icTick v-if="data.isDone" class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
        <icRound v-else class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
      </div>

      <div class="task__project__projects-list__item-content flex-row"
        :class="{ 'SELECT': selected }">

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
        <button class="no-margin"
          aria-label="open options"
          :class="{ 'DISABLED': showOpts }"
          @click="openOptions">
          <icOptions class="sm" />
        </button>
      </div>

    </div>

    <div v-if="showOpts"
           class="task__project__projects-list__expanded">

        <transition-group name="drop">
          <button v-if="showEdit"
                  :key="0"
                  aria-label="edit project name"
                  class="option"
                  @click="closeOptions">
            <icEdit />
          </button>

          <button v-if="showDelete"
                  :key="1"
                  aria-label="delete project"
                  class="option"
                  @click="closeOptions">
            <icDelete class="fill-warning" />
          </button>

          <button v-if="showClose"
                  :key="2"
                  aria-label="close options"
                  class="no-margin-r"
                  @click="closeOptions">
            <icRight />
          </button>
        </transition-group>

      </div>

  </div>

</template>

<script>
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import icEdit from '../assets/icons/ic_edit'
import icTick from '../assets/icons/ic_tick'
import icRound from '../assets/icons/ic_round'
import icRight from '../assets/icons/ic_right'
import icDelete from '../assets/icons/ic_cross'
import icOptions from '../assets/icons/ic_option'

export default {
  name: 'ProjectItem',
  components: {
    icEdit,
    icTick,
    icRound,
    icRight,
    icDelete,
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
      status: status.CLEAR,
      showOpts: false,
      showEdit: false,
      showDelete: false,
      showDone: false,
      showClose: false
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
  mounted () {
    this.$parent.$on('CLOSE-OPT', this.closeImmediate)
  },
  beforeDestroy () {
    this.$parent.$off('CLOSE-OPT', this.closeImmediate)
  },
  methods: {
    onSelectProject: function () {
      this.$store.commit('projects/projectCurrent', this.data)
    },
    openOptions: function () {
      this.$parent.$emit('CLOSE-OPT')
      helpers.timeDelay(() => { this.showOpts = true }, general.DELAY_SHORT * 0.1)
      helpers.timeDelay(() => { this.showEdit = true }, general.DELAY_SHORT * 1.5)
      helpers.timeDelay(() => { this.showDelete = true }, general.DELAY_SHORT)
      helpers.timeDelay(() => { this.showClose = true }, general.DELAY_SHORT * 0.5)
    },
    closeOptions: function () {
      helpers.timeDelay(() => { this.showOpts = false }, general.DELAY_SHORT * 2)
      helpers.timeDelay(() => { this.showEdit = false }, general.DELAY_SHORT * 0.5)
      helpers.timeDelay(() => { this.showDelete = false }, general.DELAY_SHORT * 0.7)
      helpers.timeDelay(() => { this.showClose = false }, general.DELAY_SHORT)
    },
    closeImmediate: function () {
      this.showOpts = false
      this.showEdit = false
      this.showDelete = false
      this.showClose = false
    }
  }
}
</script>
