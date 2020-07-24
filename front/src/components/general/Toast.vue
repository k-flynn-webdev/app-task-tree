<template>
  <div class="toast__message" :class="{ 'ERROR': isError }">

    <div class="toast__message__content ">

      <p class="text-bold md color-bg">
        {{ data.title }}
      </p>

      <p class="text-bold color-bg">
        {{ data.message }}
      </p>

    </div>

    <br>

    <button @click="closeToast">
      <p class="color-fore">OK</p>
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
  computed: {
    isError: function () {
      return this.data.isError === true
    }
  },
  methods: {
    closeToast: function () {
      this.$store.commit('toasts/toastRemove', this.data)
    }
  }
}
</script>
