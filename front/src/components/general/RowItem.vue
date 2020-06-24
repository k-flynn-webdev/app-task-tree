<template>

  <li class="row__item">

    <div class="row__item__line"
        :class="{
        'OPEN': options.open,
        'EDIT': isEdit,
        'DELETE': isDelete,
        'COMPLETE': isDone }">

      <RowStatus
        :class="{ 'SHADE': !selected && !isDone }"
        :is-waiting="isWaiting"
        :is-done="isDone"
        @click="onStatusClick" />

      <div class="row__item__line__mid">

        <div class="row__item__line__mid__content"
             @dblclick="onDblClick"
             @click="onClick">

          <p v-if="progress"
             class="row__item__line__mid__content-progress">
            {{ progress }}
          </p>

          <p class="row__item__line__mid__content-data break-word">
            {{ textOrName }}
          </p>

          <small v-if="data.updated" class="row__item__line__mid__content-date-md">
            {{ dayMonth }}
          </small>

          <small v-if="data.updated" class="row__item__line__mid__content-date-lg">
            {{ dayMonth + '/' + year }}
          </small>

          <small v-if="data.updated" class="row__item__line__mid__content-date-xl">
            {{ dayMonth + '/' + year + ' ' + time }}
          </small>

        </div>

        <form class="row__item__line__mid__edit"
              @submit.prevent="onConfirmOption">
          <input
              ref="itemEdit"
              class="row__item__line__mid__edit-input"
              type="text"
              :class="status"
              :value="value"
              @input="onValueChange">
        </form>

        <StatusBar :status="status" />

        <div class="row__item__line__mid-bg"></div>

      </div>

      <div class="row__item__line__option-btn">
        <button aria-label="open options"
          title="open options"
          @click="onOpenOption">
          <icOptions class="icon-90" />
        </button>
      </div>

    </div>

    <RowOption
      :options="options"
      :status="status"
      @confirm="onConfirmOption"
      @edit="onModeEdit"
      @delete="onModeDelete"
      @close="onCloseOption"/>

  </li>

</template>

<script>
import modes from '../../constants/modes.js'
import helpers from '../../services/Helpers'
import general from '../../constants/general'
import status from '../../constants/status.js'
import icOptions from '../../assets/icons/ic_option'
import RowStatus from './RowStatus'
import RowOption from './RowOption'
import StatusBar from './StatusBar'

const DEFAULT_ROW_OPTIONS = () => {
  return {
    mode: status.CLEAR,
    open: false,
    showEdit: true,
    showDelete: true,
    showClose: true,
    isValidEdit: false
  }
}

export default {
  name: 'RowItem',
  components: {
    RowStatus,
    icOptions,
    RowOption,
    StatusBar
  },
  data () {
    return {
      options: DEFAULT_ROW_OPTIONS()
    }
  },
  props: {
    data: {
      type: Object,
      default: general.DEFAULT_PROJECT
    },
    status: {
      type: String,
      default: status.CLEAR
    },
    selected: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: status.CLEAR
    }
  },
  computed: {
    progress: function () {
      if (!this.data.tasksTotal) return null
      return helpers.renderProgressNum(this.data)
    },
    textOrName: function () {
      return this.data.name || this.data.text
    },
    date: function () {
      if (!this.data.updated) return null
      return helpers.renderDate(this.data.updated)
    },
    dayMonth: function () {
      if (!this.data.updated) return null
      const tmp = this.date.split('/')
      tmp.splice(tmp.length - 1, 1)
      return tmp.join('/')
    },
    year: function () {
      if (!this.data.updated) return null
      const tmp = this.date.split('/')
      return tmp[tmp.length - 1]
    },
    time: function () {
      if (!this.data.updated) return null
      return helpers.renderTime(this.data.updated)
    },
    isEdit: function () {
      return this.options.mode === modes.EDIT
    },
    isDelete: function () {
      return this.options.mode === modes.DELETE
    },
    isWaiting: function () {
      return this.status === status.WAITING
    },
    isDone: function () {
      if (this.isWaiting) return false
      return this.data.isDone > 0
    },
    isError: function () {
      return this.status === status.ERROR
    }
  },
  mounted () {
    this.$root.$on(status.CLOSE.toLowerCase(), this.onCloseImmediate)
  },
  beforeDestroy () {
    this.$root.$off(status.CLOSE.toLowerCase(), this.onCloseImmediate)
  },
  methods: {
    resetStatus: function () {
      this.$emit(status.RESET.toLowerCase(), status.CLEAR)
    },
    resetMode: function () {
      this.options.mode = status.CLEAR
    },
    onClick: function () {
      this.$root.$emit(status.CLOSE.toLowerCase(), this.data.id)
      this.$emit(status.CLICK.toLowerCase(), this.data.id)
    },
    onDblClick: function () {
      this.$emit('dblclick', this.data.id)
    },
    onStatusClick: function () {
      this.$emit('status-click', this.data.id)
    },
    onConfirmOption: function () {
      this.$emit(modes.CONFIRM.toLowerCase(), this.options.mode)
    },
    onModeEdit: function () {
      this.onClick()
      this.$root.$emit(modes.EDIT.toLowerCase(), true)
      this.options.mode = modes.EDIT
      this.options.showEdit = false
      this.options.showDelete = false
      this.$nextTick(() => this.$refs.itemEdit.focus())
    },
    onModeDelete: function () {
      this.onClick()
      this.options.mode = modes.DELETE
      this.options.showEdit = false
      this.options.showDelete = false
      this.options.isValidEdit = true
    },
    onOpenOption: function () {
      this.$root.$emit(status.CLOSE.toLowerCase(), this.data.id)
      this.resetMode()
      this.resetStatus()
      this.options.open = true
      this.options.showEdit = true
      this.options.showDelete = true
      this.options.showClose = true
      this.options.isValidEdit = false
    },
    onCloseOption: function () {
      this.onCloseImmediate()
    },
    onCloseImmediate: function (id) {
      this.$root.$emit(modes.EDIT.toLowerCase(), false)
      if (this.data.id === id) return
      this.resetMode()
      this.options.open = false
      this.options.showEdit = false
      this.options.showDelete = false
      this.options.showClose = false
    },
    onValueChange: function (input) {
      this.checkEditIsValid(input)
      this.$emit(status.INPUT.toLowerCase(), input.target.value)
    },
    checkEditIsValid: function (input) {
      if (input.target.value.length < 4) {
        this.options.isValidEdit = false
        return
      }
      this.options.isValidEdit = (input.target.value !== this.textOrName)
    }
  }
}
</script>
