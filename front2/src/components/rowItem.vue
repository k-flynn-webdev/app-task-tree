<template>
  <div class="column is-flex start is-8 is-12-mobile px-0 pt-0 pb-3">

    <div class="flex-grow is-flex start has-text-light is-radius"
    :class="[ isEdit? 'has-background-transparent has-border-light':
    'has-border-transparent has-background-mid' ]">

      <span v-if="showProgress"
            class="row__content-progress">
        {{ progress }}
      </span>
      <b-button v-else
                class="row__content-button"
                :loading="isLoading"
                @click="toggleDone">
        <ic-tick :class="tickButtonClass" />
      </b-button>

      <p v-if="!isEdit"
         class="pad has-border-transparent is-family-sans-serif">
        {{ item.value }}
      </p>
      <b-input v-else
               class="flex-grow is-family-sans-serif"
               :placeholder="item.value"
               :value="item.value"
               :readonly="!isEdit"
               type="textarea"
               customClass="row__content-input pad has-text-light">
      </b-input>
    </div>

    <b-button class="mx-0 is-transparent"
              @click="isEdit = !isEdit">
      <icOption class="fill-light" />
    </b-button>

  </div>

</template>

<script>
import icTick from '../assets/icons/ic_tick'
import icOption from '../assets/icons/ic_option'
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
    icOption
  },

  data () {
    return {
      isEdit: false,
      isLoading: false
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
