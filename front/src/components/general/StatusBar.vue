<template>
  <div class="status bar " :class="status">
  </div>
</template>

<script>
import status from '../../constants/status.js'

export default {
  name: 'StatusBar',
  props: {
    status: {
      type: String,
      default: status.CLEAR
    }
  }
}
</script>
