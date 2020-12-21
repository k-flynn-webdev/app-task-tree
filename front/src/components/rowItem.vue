<template>
  <div class="column is-8 is-12-mobile row is-family-sans-serif">

    <div class="is-flex start">

      <div class="row__item"
           :class="[ isEdit? 'has-background-transparent has-border-light':
           'has-border-transparent has-background-mid' ]"
           @click="onSelect"
           @dblclick="onDblClick">

        <b-button v-if="isTask"
                  class="row__item__content-button"
                  :loading="isLoadingDone"
                  @click.stop="toggleDone">
          <ic-tick :class="tickButtonClass" />
        </b-button>

        <div v-else class="row__item__content-pre">
          <small v-if="showProgress"
              class="row__item__content-progress">
            {{ progress }}
          </small>
          <span v-else
                class="row__item__content-button">
            <ic-tick :class="tickButtonClass" />
          </span>
        </div>

        <div v-if="!isEdit"
             ref="rowItemText"
             class="row__item__content-msg">
          {{ item.value }}
        </div>

        <b-input v-else
                 class="row__item__content-input"
                 v-model="value"
                 :placeholder="value"
                 :readonly="!isEdit"
                 :style="rowHeightStyle"
                 type="textarea"
                 customClass="">
        </b-input>

        <div v-if="!isEdit"
             class="row__item__content-date">
          <small class="is-hidden-mobile">{{ item | itemDate }}</small>
          <small class="is-hidden-tablet">{{ item | itemDate(true,true,false) }}</small>
        </div>
      </div>

      <b-button class="mx-0 is-transparent hover"
                @click="toggleEdit">
        <ic-option class="fill-light"
                   :class="{ 'color-alpha': isEdit }" />
      </b-button>

    </div>

    <div v-if="isEdit" class="row__item-buttons">
      <b-button class="has-background-light hover"
                size="is-small"
                @click="toggleEdit">
        <ic-delete class="fill-bg v-align-center is-large" />
      </b-button>
      <b-button class="has-background-success hover"
                size="is-small"
                :disabled="!allowEditSubmit"
                @click="updateItem">
        <ic-tick class="fill-bg v-align-center is-large" />
      </b-button>
      <b-button class="remove has-background-danger hover"
                size="is-small"
                @click="removeItemConfirm">
        Delete
      </b-button>
    </div>

  </div>

</template>

<script>
import icOption from '../assets/icons/ic_option'
import icDelete from '../assets/icons/ic_cross'
import icTick from '../assets/icons/ic_tick'
import { TYPES } from '../constants'
import { get } from 'lodash-es'

const EXTRA_ROW_PAD = 5

const defaultItem = () => {
  return {
    id: 0,
    owner: 0,
    type: '',
    value: '',
    is_done: false
  }
}

export default {
  name: 'rowItem',

  components: {
    icTick,
    icOption,
    icDelete
  },

  data () {
    return {
      isLoadingDone: false,
      isLoading: false,
      value: null,
      row: {
        height: 5
      }
    }
  },

  props: {
    item: {
      type: Object,
      default: defaultItem
    },
    type: {
      type: String,
      default: ''
    },
    edit: {
      type: Number,
      default: -1
    }
  },

  computed: {
    rowHeightStyle () {
      return {
        'min-height': this.row.height + 'px'
      }
    },
    isEdit () {
      return this.item.id === this.edit
    },
    isTask () {
      return this.type === TYPES.task.value
    },
    isComplete () {
      return !!this.item.is_done
    },
    showProgress () {
      if (this.isComplete) return false
      return (!this.isTask)
    },
    progress () {
      if (!this.showProgress) return ''
      return this.renderProgressPercent(
          this.item.progress, this.item.total)
    },
    tickButtonClass () {
      if (this.isLoadingDone) return 'fill-transparent'
      if (this.item.is_done) return 'fill-success'
      return 'fill-bg'
    },
    allowEditSubmit () {
      return (this.value !== this.item.value && this.value.length > 3)
    }
  },

  mounted () {
    this.getRowHeight()
  },

  methods: {
    getRowHeight () {
      this.row.height = this.$refs.rowItemText.clientHeight - 10
    },
    /** Toggle open or close the edit state */
    toggleEdit () {
      if (this.isEdit) {
        this.closeEdit()
      } else {
        this.onEdit()
      }
    },
    /**
     * Set Edit mode of value
     */
    onEdit () {
      this.value = this.item.value
      this.openEdit()
    },
    openEdit () {
      this.$emit('onEdit', this.item.id)
    },
    closeEdit () {
      this.$emit('onEdit', -1)
    },
    /**
     * Set current store with selected item
     */
    onSelect () {
      if (this.isEdit) return
      if(this.type === TYPES.task.value) return

      return this.$store.commit(`${TYPES[this.type].store}/setCurrent`, this.item)
    },
    /**
     * Opens Item of Type to be worked with
     *    eg open a project to create plan items related to it ..
     */
    onOpenItem () {
      const child = TYPES[this.type].child
      this.$router.push({
        name: child,
        query: { [this.type]: this.item.id }
      })
    },
    /**
     * Dbl Click catch
     */
    onDblClick () {
      if(this.type === TYPES.task.value) {
        if (this.isEdit) return

        return this.toggleDone()
      }

      return this.onOpenItem()
    },
    /**
     * Render the progress from a object
     *
     * @param {number} done
     * @param {number} total
     * @returns {string}  eg `77%`
     */
    renderProgressPercent (done, total) {
      if (!total || total === 0) return '0%'
      if (!done || done === 0) return '0%'
      const finalNum = Math.floor((done / total) * 100)
      return `${finalNum.toString()}%`
    },
    /**
     * Set item to done `IF` is a Task
     */
    toggleDone () {
      if (this.isEdit) return
      if (this.isLoadingDone) return
      if (this.type !== TYPES.task.value) return

      this.isLoadingDone = true
      const doneValue = !!this.item.is_done

      return this.$store.dispatch(`${TYPES[this.type].store}/patch`,
          { id: this.item.id, is_done: !doneValue })
      .catch(err => this.handleError(err))
      .finally(() => this.isLoadingDone = false)
    },
    /**
     * Remove item via API
     *
     * @returns {promise|void}
     */
    updateItem () {
      if (this.isLoading) return
      if (!this.allowEditSubmit) return

      this.isLoading = true
      return this.$store.dispatch(`${TYPES[this.type].store}/patch`,
          { id: this.item.id, value: this.value })
      .then(() => {
        this.closeEdit()
      })
      .then(() => this.getRowHeight())
      .catch(err => this.handleError(err))
      .finally(() => this.isLoading = false)
    },
    /**
     * Show confirm dialog to delete
     */
    removeItemConfirm () {
      this.$buefy.dialog.confirm({
        title: `Deleting ${this.value}`,
        message: 'Are you sure you want to <b>delete</b>? This action cannot be undone.',
        confirmText: `Delete ${this.type}`,
        type: 'is-danger',
        hasIcon: true,
        onConfirm: () => this.removeItem()
      })
    },

    /**
     * Remove item via API
     *
     * @returns {promise|void}
     */
    removeItem () {
      if (this.isLoading) return

      this.isLoading = true
      return this.$store.dispatch(`${TYPES[this.type].store}/remove`, this.item.id)
      .then(() => {
        this.closeEdit()
        this.$buefy.toast.open({
          type: 'is-success',
          message: 'Item deleted!'
        })
      })
      .catch(err => this.handleError(err))
      .finally(() => this.isLoading = false)
    },
    /**
     * Show User error messages
     *
     * @param err
     */
    handleError (err) {
      this.isLoading = true
      this.$buefy.toast.open({
        duration: 5000,
        message: get(err, 'response.data.message', 'error'),
        position: 'is-top',
        type: 'is-danger'
      })
    }
  }
}
</script>
