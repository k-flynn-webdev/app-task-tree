<template>
  <div class="column is-8 is-12-mobile px-0 py-0 mb-2 row">

    <div class="is-flex start">

      <div class="is-flex start flex-grow has-text-light is-radius row__item"
           :class="[ isEdit? 'has-background-transparent has-border-light':
           'has-border-transparent has-background-mid' ]"
           @click="onSelect"
           @dblclick="onDblClick">

        <span v-if="showProgress"
              class="row__content-progress">
          {{ progress }}
        </span>
        <b-button v-else
                  class="row__content-button"
                  :loading="isLoadingDone"
                  @click.stop="toggleDone">
          <ic-tick :class="tickButtonClass" />
        </b-button>

        <span v-if="!isEdit"
           class="pad has-border-transparent is-family-sans-serif word-break">
          {{ item.value }}
        </span>
        <b-input v-else
                 class="flex-grow is-inline-block is-family-sans-serif"
                 v-model="value"
                 :placeholder="value"
                 :readonly="!isEdit"
                 type="textarea"
                 customClass="row__content-input pad has-text-light">
        </b-input>
      </div>

      <b-button class="mx-0 is-transparent"
                @click="onEdit">
        <ic-option class="fill-light"
                   :class="{ 'color-alpha': isEdit }" />
      </b-button>

    </div>

    <div v-if="isEdit" class="mt-2">
      <b-button class="mx-3 mb-1 has-background-danger has-border-transparent"
                size="is-small"
                @click="removeItem">
        <ic-delete class="fill-bg v-align-center is-large" />
      </b-button>
      <b-button class="mx-3 mb-1 has-background-success has-border-transparent"
                size="is-small"
                @click="updateItem">
        <ic-tick class="fill-bg v-align-center is-large" />
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
      isEdit: false,
      isLoadingDone: false,
      isLoading: false,
      value: null
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
    }
  },

  computed: {
    showProgress () {
      return this.type !== TYPES.task.value
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
    }
  },

  methods: {
    /**
     * Set Edit mode of value
     */
    onEdit () {
      this.value = this.item.value
      this.isEdit = !this.isEdit
    },
    /**
     * Set current store with selected item
     */
    onSelect () {
      if (this.isEdit) return
      if(this.type === TYPES.task.value) return

      this.$store.commit('title', this.item.value)
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
      .then(() => {
        this.isLoadingDone = false
      })
      .catch(err => this.handleError(err))
    },
    /**
     * Remove item via API
     *
     * @returns {promise|void}
     */
    updateItem () {
      if (this.isLoading) return

      this.isLoading = true
      return this.$store.dispatch(`${TYPES[this.type].store}/patch`,
          { id: this.item.id, value: this.value })
      .then(() => {
        this.isEdit = false
        this.isLoading = false
      })
      .catch(err => this.handleError(err))
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
        this.isEdit = false
        this.isLoading = false
      })
      .catch(err => this.handleError(err))
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
