<template>

  <li class="list-item">

    <div class="task__project__list__item"
         :class="{ status, 'EDIT': isEdit }">

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

        <form class="task__project__list__item__edit"
              @submit.prevent="confirmEdit">
          <input class="task__project__list__item__edit-input"
                 type="text"
                 v-model="edit.data"
                 @input="resetStatus">
        </form>

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
      },
      edit: {
        data: status.CLEAR
      }
    }
  },
  computed: {
    progress: function () {
      return helpers.renderProgressNum(this.data.tasksDone, this.data.tasksTotal)
    },
    date: function () {
      return helpers.renderTime(this.data.updated)
    },
    isEdit: function () {
      return this.options.mode === modes.EDIT
    },
    isDelete: function () {
      return this.options.mode === modes.DELETE
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
      this.edit.data = this.data.name
      this.options.mode = modes.EDIT
      this.options.showDelete = false
      this.options.showEdit = false
    },
    onModeDelete: function () {
      this.options.mode = modes.DELETE
      this.options.showDelete = false
      this.options.showEdit = false
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
      if (this.status !== status.CLEAR) return
      if (this.edit.data === this.data.name) return

      this.status = status.WAITING
      const updatedName = { id: this.data.id, name: this.edit.data }

      return this.$store.dispatch('projects/update', updatedName)
        .then(() => {
          this.status = status.SUCCESS
          this.resetMode()
          this.closeOptions()

          helpers.timeDelay(() => {
            this.resetStatus()
          }, general.DELAY_SUCCESS)
        })
        .catch(err => this.handleError(err))
    },
    confirmDelete: function () {
      if (this.status !== status.CLEAR) return

      this.status = status.WAITING

      return this.$store.dispatch('projects/remove', this.data)
        .then(() => {
          this.resetMode()
          this.closeOptions()
          this.status = status.SUCCESS

          helpers.timeDelay(() => {
            this.resetStatus()
          }, general.DELAY_SUCCESS)
        })
        .catch(err => this.handleError(err))
    },
    openOptions: function () {
      this.resetMode()
      this.resetStatus()
      this.$parent.$emit('CLOSE-OPT')
      this.options.show = true
      this.options.showEdit = true
      this.options.showDelete = true
      this.options.showClose = true
    },
    closeOptions: function () {
      this.resetMode()
      this.options.show = false
    },
    closeImmediate: function () {
      this.resetMode()
      this.options.show = false
      this.options.showEdit = false
      this.options.showDelete = false
      this.options.showClose = false
    },
    resetStatus: function () {
      this.status = status.CLEAR
    },
    resetMode: function () {
      this.options.mode = status.CLEAR
    },
    handleError: function (err) {
      this.status = status.ERROR
      this.$emit(status.ERROR, err)
      this.$store.commit('toasts/toastAdd', err)

      helpers.timeDelay(() => {
        this.resetStatus()
      }, general.DELAY_ERROR)
    }
  }
}
</script>
