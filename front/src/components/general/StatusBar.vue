<template>
  <div class="status bar " :class="statusUpdate"></div>
</template>

<script>
import helpers from '../../services/Helpers'
import general from '../../constants/general'
import status from '../../constants/status.js'

export default {
  /** A visual status animated bar **/
  name: 'StatusBar',
  data () {
    return {
      /** Managed status, controlled by the status prop changes **/
      statusUpdate: status.CLEAR
    }
  },
  props: {
    status: {
      type: String,
      default: status.CLEAR
    }
  },
  watch: {
    /**
     * Watch the status and implement a short
     *    blip in order to force a render/change
     *
     * @param input
     * @param pre
     */
    status: function (input, pre) {
      const hadPre = (pre && pre.length > 0)
      const hadInput = (input && input.length > 0)
      const equalInput = input === pre

      // changing to be clear??
      if (hadPre && !hadInput) {
        this.delayComplete()
        return
      }

      // changing to another class, force a blip??
      if (hadPre && hadInput && !equalInput) {
        this.delayStatusUpdate(input)
        return
      }

      this.statusUpdate = input
    }
  },
  methods: {
    delayComplete: function () {
      this.statusUpdate = status.COMPLETE

      helpers.timeDelay(() => {
        this.statusUpdate = status.CLEAR
      }, general.DELAY_SHORT)
    },
    delayStatusUpdate: function (input) {
      this.statusUpdate = status.CLEAR

      helpers.timeDelay(() => {
        this.statusUpdate = input
      }, general.DELAY_BLIP)
    }
  }
}
</script>
