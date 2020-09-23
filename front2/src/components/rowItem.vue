<template>
  <div class="column is-8 is-12-mobile px-0 py-0 mb-2">

    <div class="is-flex start">

      <div class="is-flex start flex-grow has-text-light is-radius"
           :class="[ isEdit? 'has-background-transparent has-border-light':
           'has-border-transparent has-background-mid' ]">

        <span v-if="showProgress"
              class="row__content-progress">
          {{ progress }}
        </span>

        <span v-if="!isEdit"
           class="pad has-border-transparent is-family-sans-serif">
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
      <b-button class="mx-3 mb-1 has-background-danger has-border-transparent" size="is-small">
        <ic-delete class="fill-bg v-align-center is-large" />
      </b-button>
      <b-button class="mx-3 mb-1 has-background-success has-border-transparent" size="is-small">
        <ic-tick class="fill-bg v-align-center is-large" />
      </b-button>
    </div>

  </div>

</template>

<script>
import icTick from '../assets/icons/ic_tick'
import icOption from '../assets/icons/ic_option'
import icDelete from '../assets/icons/ic_cross'
import { TYPES } from '../constants'

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
      isLoading: false,
      value: null
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
      if (this.isLoading) return 'fill-transparent'
      if (this.item.is_done) return 'fill-success'
      return 'fill-bg'
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

  methods: {
    onEdit () {
      this.value = this.item.value
      this.isEdit = !this.isEdit
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
    toggleDone () {
      if (this.isEdit) return
      if (this.isLoading) return
      if (this.type !== TYPES.task.value) return

      this.isLoading = true
      let self = this
      setTimeout(function () {
        self.item.is_done = !self.item.is_done
        self.isLoading = false
      }, 1500)
    }
  }
}
</script>
