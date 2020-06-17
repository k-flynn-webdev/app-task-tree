<template>

  <div class="move-item">

    <div class="task__project__projects-list__item"
         :class="status">

      <div class="task__project__projects-list__item-status text-left"
        @click="onSelectProject">
        <icDone v-if="data.isDone" class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
        <icRound v-else class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
      </div>

      <div class="task__project__projects-list__item-content flex-row"
        :class="{ 'SELECT': selected }"
        @click="onSelectProject">

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
          title="open options"
          :class="{ 'DISABLED': showOpts }"
          @click="openOptions">
          <icOptions class="sm" />
        </button>
      </div>

    </div>

    <div v-if="showOpts"
           class="task__project__projects-list__expanded">

        <transition-group name="fade">

          <span v-if="showDeleteConfirm"
                  :key="-1"
                  class="option no-margin-r">
            Are you sure?

            <button aria-label="ok"
                    title="ok"
                    class="no-margin-r"
                    @click="confirmDelete">
              <icDone />
            </button>
          </span>

          <span v-if="showEditConfirm"
                :key="-1"
                class="option no-margin-r">
            Are you sure?

            <button aria-label="ok"
                    title="ok"
                    class="no-margin-r"
                    @click="confirmEdit">
              <icDone />
            </button>
          </span>

          <button v-if="showEdit"
                  :key="0"
                  aria-label="edit project name"
                  title="edit project name"
                  class="option"
                  @click="onEdit">
            <icEdit />
          </button>

          <button v-if="showDelete"
                  :key="1"
                  aria-label="delete project"
                  title="delete project"
                  class="option"
                  @click="onDelete">
            <icDelete class="fill-warning" />
          </button>

          <button v-if="showClose"
                  :key="3"
                  aria-label="close options"
                  title="close options"
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
import modes from '../constants/modes.js'
import icEdit from '../assets/icons/ic_edit'
import icDone from '../assets/icons/ic_tick'
import icRound from '../assets/icons/ic_round'
import icRight from '../assets/icons/ic_right'
import icDelete from '../assets/icons/ic_cross'
import icOptions from '../assets/icons/ic_option'

const optionTimings = [0.1, 0.4, 0.8, 1.1, 1.5, 2.5]

export default {
  name: 'ProjectItem',
  components: {
    icEdit,
    icDone,
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
      mode: status.CLEAR,
      status: status.CLEAR,
      showOpts: false,
      showEdit: false,
      showDelete: false,
      showClose: false
    }
  },
  computed: {
    progress: function () {
      return helpers.renderProgressNum(this.data.tasksDone, this.data.tasksTotal)
    },
    date: function () {
      return helpers.renderTime(this.data.updated)
    },
    showDeleteConfirm: function () {
      return this.mode === modes.DELETE
    },
    showEditConfirm: function () {
      return this.mode === modes.EDIT
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
    onEdit: function () {
      this.mode = modes.EDIT
      this.showDelete = false
      this.showEdit = false
    },
    onDelete: function () {
      this.mode = modes.DELETE
      this.showDelete = false
      this.showEdit = false
    },
    confirmEdit: function () {

    },
    confirmDelete: function () {

    },
    openOptions: function () {
      this.mode = status.CLEAR

      this.$parent.$emit('CLOSE-OPT')
      helpers.timeDelay(() => { this.showOpts = true }, general.DELAY_SHORT * optionTimings[0])
      helpers.timeDelay(() => { this.showEdit = true }, general.DELAY_SHORT * optionTimings[5])
      helpers.timeDelay(() => { this.showDelete = true }, general.DELAY_SHORT * optionTimings[3])
      helpers.timeDelay(() => { this.showClose = true }, general.DELAY_SHORT * optionTimings[1])
    },
    closeOptions: function () {
      this.mode = status.CLEAR

      helpers.timeDelay(() => { this.showEdit = false }, general.DELAY_SHORT * optionTimings[0])
      helpers.timeDelay(() => { this.showDelete = false }, general.DELAY_SHORT * optionTimings[1])
      helpers.timeDelay(() => { this.showClose = false }, general.DELAY_SHORT * optionTimings[3])
      helpers.timeDelay(() => { this.showOpts = false }, general.DELAY_SHORT * optionTimings[5])
    },
    closeImmediate: function () {
      this.showOpts = false
      this.showEdit = false
      this.showDelete = false
      this.showClose = false
      this.mode = status.CLEAR
    }
  }
}
</script>
