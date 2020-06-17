<template>
  <div class="toast">
    <Toast
      v-for="toast in Toasts"
      :key="toast.id"
      :data="toast"
    />
  </div>
</template>

<script>
import Toast from './Toast'

export default {
  name: 'ToastHolder',
  components: {
    Toast
  },
  computed: {
    Toasts: function () {
      return this.$store.getters['toasts/toasts']
    }
  },
  methods: {
    clearAllToasts: function () {
      this.$store.commit('toasts/toastRemoveAll')
    }
  }
}
</script>
