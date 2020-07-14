<template>

  <div class="settings">

    <button class="settings__btn color-fore fill-fore"
            :class="{ 'bg-fore': value }"
            @click="Toggle">
      <icOptions v-if="!value" class="icon-90" />
      <icClose v-else class="icon-90 fill-bg is-close" />
    </button>

    <div v-if="value" class="settings__holder">
      content
    </div>
  </div>

</template>

<script>
import icClose from '../assets/icons/ic_cross'
import icOptions from '../assets/icons/ic_option'

export default {
  name: 'AppSettings',
  components: {
    icClose,
    icOptions
  },
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    }
  },
  methods: {
    Toggle: function () {
      this.$emit('input', !this.value)
    }
  }
}
</script>
