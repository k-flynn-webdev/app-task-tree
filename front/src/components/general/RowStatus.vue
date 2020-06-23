<template>
  <div class="row__item__status"
       title="Click to change status"
       @click="onClick">
    <div class="row__item__status-icon">
      <icDone v-if="isDone" class="fill-success" />
      <icNone v-else-if="isWaiting" class="fill-waiting" />
      <icRound v-else class="icon-60 fill-fore" />
    </div>
  </div>
</template>

<script>
import icNone from '../../assets/icons/ic_none'
import icDone from '../../assets/icons/ic_tick'
import icRound from '../../assets/icons/ic_round'

export default {
  name: 'RowStatus',
  components: {
    icNone,
    icDone,
    icRound
  },
  props: {
    isWaiting: {
      type: Boolean,
      default: false
    },
    isDone: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    /**
     * Emit event of type
     */
    onClick: function () {
      this.$emit('click')
    }
  }
}
</script>
