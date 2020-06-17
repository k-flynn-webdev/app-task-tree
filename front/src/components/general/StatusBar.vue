<template>
  <div class="status bar " :class="statusUpdate"></div>
</template>

<script>
import helpers from '../../services/Helpers'
import general from '../../constants/general'
import status from '../../constants/status.js'

export default {
  /**
   * A visual status animated bar
   */
  name: 'StatusBar',
  data () {
    return {
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
      if (input && input.length > 0) {
        if (pre && pre.length > 0) {
          if (pre !== input) {
            // needs a short wait to force render change!
            this.statusUpdate = status.CLEAR

            helpers.timeDelay(() => {
              this.statusUpdate = input
            }, general.DELAY_BLIP)
            return
          }
        }
      }

      this.statusUpdate = input
    }
  }
}
</script>
