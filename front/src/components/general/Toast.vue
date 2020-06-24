<template>
  <div class="toast__message" :class="{ 'ERROR': isError }">

    <div class="toast__message__content ">

      <p class="color-bg text-bold md"
      :class="{ 'color-fore': !isError }">
        {{ data.title }}
      </p>

      <p class="color-bg text-bold"
      :class="{ 'color-fore': !isError }">
        {{ data.message }}
      </p>

    </div>

    <br>

    <button @click="closeToast">
     OK
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
