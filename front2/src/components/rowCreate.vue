<template>
  <div class="column is-8 is-12-mobile px-0 mb-0">
    <form @submit.prevent="submitForm">
      <b-field>
        <b-input class="is-expanded"
                 v-model="value"
                 type="string"
                 maxlength="200"
                 :placeholder="placeHolder"
                 :hasCounter="false">
        </b-input>
        <p class="control">
          <b-button native-type="submit"
                    type="is-primary"
                    :disabled="!isValid"
                    :loading="isLoading"
                    @click="submitForm">
            <ic-add class="mt-1 is-medium"
                    :class="createBtnClass" />
          </b-button>
        </p>
      </b-field>
    </form>
  </div>
</template>

<script>
import icAdd from '../assets/icons/ic_tick'
import { TYPES } from '../constants'
import { get } from 'lodash-es'

export default {
  name: 'rowCreate',

  components: {
    icAdd
  },

  data () {
    return {
      value: '',
      previous: null,
      isLoading: false
    }
  },

  props: {
    type: {
      type: String,
      default: ''
    }
  },

  computed: {
    isValid () {
      return this.value.length >= 3 && this.value.length <= 200
    },
    placeHolder () {
      return `${this.type} to create ..`
    },
    createBtnClass () {
      if (this.isLoading) return 'fill-transparent'
      if (this.isValid) return 'fill-bg'
      return 'fill-bg'
    }
  },

  created () {
    this.reset()
  },

  methods: {
    reset () {
      this.value = ''
      this.isLoading = false
    },
    submitForm () {
      if (!this.isValid) return
      if (this.isLoading) return
      if (this.previous === this.value) return

      this.isLoading = true

      const query = this.$store.state.query

      return this.$store.dispatch(`${TYPES[this.type].store}/post`,
          {
            value: this.value,
            ...query
          })
        .then(res => {
          this.previous = this.value
          this.reset()

          this.$buefy.toast.open({
            duration: 1500,
            message: get(res, 'data.message', 'success'),
            position: 'is-top',
            type: 'is-success'
          })
        })
        .catch(err => {
          this.isLoading = false

          this.$buefy.toast.open({
            duration: 5000,
            message: get(err, 'response.data.message', 'error'),
            position: 'is-top',
            type: 'is-danger'
          })

          throw err
        })
    }
  }

}
</script>
