<template>
  <div class="row__item__status"
       :class="{ 'NO-CHECKBOX': !isCheckBox, 'HOVER': isCheckBox }"
       title="Click to change status">

    <label>

      <input type="checkbox" :value="isDone" @click="onClick">

      <div class="row__item__status-icon control">
        <icDone v-if="isDone" class="fill-success-status" />
        <icNone v-else-if="isWaiting" class="fill-waiting-status" />
        <icRound v-else class="fill-fore" />
      </div>

      <span>label here</span>

    </label>

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
    },
    isCheckBox: {
      type: Boolean,
      default: true
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
