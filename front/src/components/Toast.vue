<template>
  <div class="toast">
    {{ data }}
  </div>
</template>

<script>

function DefaultObj () {
  return {
    id: -1,
    title: '',
    message: '',
    status: ''
  }
}

export default {
  name: 'Toast',
  props: {
    data: DefaultObj()
  },
  methods: {
    clearToast: function (toast) {
      this.$store.commit('toasts/toastRemove', toast)
    }
  }
}
</script>
