<template>
  <div class="relative no-overflow">

    <transition name="slide">
      <slot name="0" v-if="showRow(0)" />
    </transition>

    <transition name="slide">
      <slot name="1" v-if="showRow(1)" />
    </transition>

    <transition name="slide">
      <slot name="2" v-if="showRow(2)" />
    </transition>

    <transition name="slide">
      <slot name="3" v-if="showRow(3)" />
    </transition>

  </div>
</template>

<script>

const showDefault = () => [false]

export default {
  name: 'MenuRowOptSlide',
  props: {
    show: {
      type: Array,
      default: showDefault()
    }
  },
  methods: {
    showRow: function (row) {
      if (this.show.length < row) return false
      return this.show[row]
    }
  }
}
</script>
