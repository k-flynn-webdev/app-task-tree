<template>
  <b-modal
      has-modal-card
      trap-focus
      aria-modal
      aria-role="dialog"
      :active="isOpen"
      :canCancel="false"
      :destroy-on-hide="false"
      @close="$emit('close', true)">

    <form @submit.prevent="onSubmit">
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Edit</p>
          <button
              type="button"
              class="delete"
              @click="$emit('close')"/>
        </header>
        <section class="modal-card-body" v-if="item">

          <b-field v-for="field in fields"
                   :label="field.label">
            <b-input
                type="string"
                v-model="item[field.field]"
                :placeholder="item[field.field]">
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <button class="button is-danger"
                  type="button"
                  @click="onDelete">
            Delete
          </button>
          <div class="flex-grow"></div>
          <button class="button"
                  type="button"
                  @click="$emit('close')">
            Close
          </button>
          <button class="button is-primary"
                  :disabled="!hasDiff"
                  @click="onSubmit">
            Save
          </button>
        </footer>
      </div>
    </form>

  </b-modal>

</template>

<script>
import HTTP from '../../services/HttpService'
// import icAdd from '../assets/icons/ic_tick'
// import { TYPES } from '../constants'
import { get } from 'lodash-es'

const defaultObj = () => {
  return {}
}

export default {
  name: 'crudModal',

  components: {
    // icAdd
  },

  data () {
    return {
      itemDiff: '',
      isLoading: false,
      // isOpen: false,
    }
  },

  props: {
    /**
     * State of Modal
     *
     * @type {Boolean}
     */
    isOpen : {
      type: Boolean,
      default: false
    },
    /**
     * Array of fields to display/edit
     *
     * @type {Array}
     */
    fields: {
      type: Array,
      default: []
    },
    /**
     * API object used to edit
     *
     * @type {Object}
     */
    api: {
      type: Object,
      default: defaultObj
    },
    /**
     * Item to edit
     *
     * @type {Object}
     */
    item: {
      type: Object,
      default: defaultObj
    }
  },

  computed: {
    hasDiff () {
      if (!this.item) return ''
      return this.itemDiff !== Object.values(this.item).toString()
    }
  },

  watch: {
    isOpen () {
      this.reset()
    }
  },

  methods: {
    reset () {
      this.itemDiff = Object.values(this.item).toString()
      this.isLoading = false
    },
    onDelete () {
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.remove(`${this.api.DELETE}/${this.item.id}`)
      .then(res => {
        this.onSuccess(res)
        this.$emit('close', true)
      })
      .catch(err => this.onError(err))
      .finally(() => {
        this.isLoading = false
      })
    },
    onSubmit () {
      if (!this.hasDiff) return
      if (this.isLoading) return

      this.isLoading = true

      return HTTP.put(`${this.api.PATCH}/${this.item.id}`,
          this.item)
        .then(res => this.onSuccess(res))
        .catch(err => this.onError(err))
    },
    onSuccess (res) {
      this.isLoading = false

      this.$buefy.toast.open({
        duration: 1500,
        message: get(res, 'data.message', 'success'),
        position: 'is-top',
        type: 'is-success'
      })
    },
    onError (err) {
      this.$buefy.toast.open({
        duration: 5000,
        message: get(err, 'response.data.message', 'error'),
        position: 'is-top',
        type: 'is-danger'
      })

      throw err
    },
  }

}
</script>
