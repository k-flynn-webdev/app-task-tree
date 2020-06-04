<template>
  <div class="toast" :class="{ 'ERROR': data.isError }">
    <div class="toast__content">
      {{ data }}
    </div>
    <button
      class="toast__close"
      @click="closeToast">
      X
    </button>
  </div>
</template>

<script>

function DefaultObj () {
  return {
    id: -1,
    title: '',
    message: '',
    status: '',
    isError: false,
    isTimed: false,
    time: -1
  }
}

export default {
  name: 'Toast',
  props: {
    data: DefaultObj()
  },
  methods: {
    closeToast: function () {
      this.$store.commit('toasts/toastRemove', this.data)
    }
  }
}
</script>
