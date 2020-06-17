<template>
  <div>
    <div class="status bar " :class="status">
      <!--  <div ref="statusBar" class="status bar " :class="statusBarClass">-->
    </div>
  </div>
</template>

<script>
// import helpers from '../../services/Helpers'
// import general from '../../constants/general'
import status from '../../constants/status.js'

export default {
  name: 'StatusBar',
  props: {
    status: {
      type: String,
      default: status.CLEAR
    }
  }
  // computed: {
  //   statusBarClass: function () {
  //     return status + this.progress
  //   }
  // },
  // data () {
  //   return {
  //     progress: ''
  //   }
  // },
  // watch: {
  //   status: function (input, old) {
  //     if (input && input.length > 0) {
  //       this.progress = 'anim'
  //     } else {
  //       this.progress = status.CLEAR
  //     }
  //     // if (input && input.length > 0) {
  //     //
  //     // }
  //     // if (input !== old) {
  //     //
  //     // }
  //   }
  // },
  // methods: {
  //   start: function () {
  //
  //   }
  // }
}
</script>
