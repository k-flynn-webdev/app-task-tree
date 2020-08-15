<template>
  <div class="toast__holder" :class="{ 'SHOW': Toasts.length > 0}">

    <div class="toast__holder__body">
      <Toast
        v-for="toast in Toasts"
        :key="toast.id"
        :data="toast"
      />
    </div>

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
      return this.$store.state.toasts.toasts
    }
  },
  methods: {
    clearAllToasts: function () {
      this.$store.commit('toasts/clearAllToasts')
    }
  }
}
</script>
