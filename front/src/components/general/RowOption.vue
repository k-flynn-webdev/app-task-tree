<template>
    <div v-if="options.show"
         class="task__project__list__item__option-bar">

      <span v-if="showConfirm"
            key="showConfirm"
            class="task__project__list__item__option-bar-confirm">
          <span v-if="options.mode === 'DELETE'"> Delete
            <span class="hide-md-down"> Item</span> ?
          </span>

        <button
            aria-label="confirm change"
            title="confirm change"
            :class="[ options.status, options.isValidEdit ? '' : 'DISABLED' ]"
            @click="onConfirm">
          <icDone />
        </button>
      </span>

      <button v-if="options.showEdit"
              key="showEdit"
              aria-label="edit item"
              title="edit item"
              class="task__project__list__item__option-bar-edit"
              @click="onEdit">
        <icEdit />
      </button>

      <button v-if="options.showDelete"
              key="showDelete"
              aria-label="delete item"
              title="delete item"
              class="task__project__list__item__option-bar-delete"
              @click="onDelete">
        <icDelete class="fill-warning" />
      </button>

      <button v-if="options.showClose"
              key="showClose"
              aria-label="close options"
              title="close options"
              class="task__project__list__item__option-bar-close"
              @click="closeOptions">
        <icRight />
      </button>

    </div>
</template>

<script>
// import helpers from '../../services/Helpers'
// import general from '../../constants/general'
import status from '../../constants/status.js'
import modes from '../../constants/modes.js'
import icEdit from '../../assets/icons/ic_edit'
import icDone from '../../assets/icons/ic_tick'
import icRight from '../../assets/icons/ic_right'
import icDelete from '../../assets/icons/ic_cross'

const optionDefault = () => {
  return {
    mode: status.CLEAR,
    status: status.CLEAR,
    show: false,
    showEdit: true,
    showDelete: true,
    showClose: true,
    isValidEdit: true
  }
}

export default {
  name: 'RowOption',
  components: {
    icEdit,
    icDone,
    icRight,
    icDelete
  },
  props: {
    options: {
      type: Object,
      default: optionDefault()
    }
  },
  computed: {
    showConfirm: function () {
      return (this.options.mode === modes.EDIT ||
        this.options.mode === modes.DELETE)
    }
  },
  methods: {
    /**
     * Emit event of type
     */
    onEdit: function () {
      this.$emit(modes.EDIT.toLowerCase())
    },
    /**
     * Emit event of type
     */
    onDelete: function () {
      this.$emit(modes.DELETE.toLowerCase())
    },
    /**
     * Emit event of type
     */
    onConfirm: function () {
      this.$emit(modes.CONFIRM.toLowerCase(), this.options.mode)
    },
    /**
     * Emit event of type
     */
    closeOptions: function () {
      this.$emit(status.CLOSE.toLowerCase())
    }
  }
}
</script>
