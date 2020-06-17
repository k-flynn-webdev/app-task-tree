<template>

  <li class="list-item">

    <div class="task__project__list__item"
         :class="status">

      <div class="task__project__list__item-status text-left"
        @click="onSelectProject">
        <icDone v-if="data.isDone" class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
        <icRound v-else class="xs transition"
                :class="{ 'DISABLED': !selected }"/>
      </div>

      <div class="task__project__list__item-content"
        :class="{ 'SELECT': selected }"
        @click="onSelectProject">

        <StatusBar :status="status" />

        <p class="task__project__list__item-progress">
          {{ progress }}
        </p>

        <p class="task__project__list__item-data">
          {{ data.name }}
        </p>

        <p class="task__project__list__item-updated">
          {{ date }}
        </p>

      </div>

      <div class="task__project__list__item-option-bar-btn">
        <button class="no-margin"
          aria-label="open options"
          title="open options"
          :class="{ 'DISABLED': options.show }"
          @click="openOptions">
          <icOptions class="sm" />
        </button>
      </div>

    </div>

    <RowOption
      :options="options"
      @confirm="onConfirm"
      @edit="onModeEdit"
      @delete="onModeDelete"
      @close="closeOptions"/>

  </li>

</template>

<script>
import modes from '../constants/modes.js'
import helpers from '../services/Helpers'
import general from '../constants/general'
import status from '../constants/status.js'
import icDone from '../assets/icons/ic_tick'
import icRound from '../assets/icons/ic_round'
import icOptions from '../assets/icons/ic_option'
import RowOption from './general/RowOption'
import StatusBar from './general/StatusBar'

export default {
  name: 'ProjectItem',
  components: {
    icDone,
    icRound,
    icOptions,
    RowOption,
    StatusBar
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
      options: {
        mode: status.CLEAR,
        show: false,
        showEdit: true,
        showDelete: true,
        showClose: true
      }
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
    onModeEdit: function () {
      this.options.mode = modes.EDIT
      this.options.showDelete = false
      this.options.showEdit = false
    },
    onModeDelete: function () {
      this.options.mode = modes.DELETE
      this.options.showDelete = false
      this.options.showEdit = false
    },
    onModeClear: function () {
      this.options.mode = modes.CLEAR
    },
    /**
     * Consume confirm event of row component
     *   with 'mode' type
     *
     * @param {string}  mode  types [EDIT, DELETE]
     */
    onConfirm: function (mode) {
      if (mode === modes.EDIT) return this.confirmEdit()
      if (mode === modes.DELETE) return this.confirmDelete()
    },
    confirmEdit: function () {
      console.log('confirm edit')
    },
    confirmDelete: function () {
      this.status = status.WAITING

      return this.$store.dispatch('projects/remove', this.data)
        .then(() => {
          this.$nextTick(() => { this.status = status.CLEAR })
        })
        .then(() => {
          this.status = status.SUCCESS

          helpers.timeDelay(() => {
            this.status = status.CLEAR
          }, general.DELAY_SUCCESS)
        })
        .catch(err => this.handleError(err))
    },
    openOptions: function () {
      this.onModeClear()
      this.$parent.$emit('CLOSE-OPT')
      this.options.show = true
      this.options.showEdit = true
      this.options.showDelete = true
      this.options.showClose = true
    },
    closeOptions: function () {
      this.onModeClear()
      this.options.show = false
    },
    closeImmediate: function () {
      this.onModeClear()
      this.options.show = false
      this.options.showEdit = false
      this.options.showDelete = false
      this.options.showClose = false
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)

      helpers.timeDelay(() => {
        this.status = status.CLEAR
      }, general.DELAY_ERROR)
    }
  }
}
</script>
