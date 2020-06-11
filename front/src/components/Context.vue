<template>
  <div class="context">

      <button
        class="context__tgl-l"
        :class="getBtnClass(0)"
        @click="tglContext">
        {{ modes[0] }}
      </button>

      <button
        class="context__tgl-r"
        :class="getBtnClass(1)"
        @click="tglContext">
        {{ modes[1] }}
      </button>

  </div>
</template>

<script>
// import helpers from '../services/Helpers'
// import general from '../constants/general'
// import status from '../constants/status'

// import ProjectCreate from './ProjectCreate'
// import ProjectRename from './ProjectRename'
// import ProjectDelete from './ProjectDelete'
// import ProjectSelect from './ProjectSelect'
// import MenuRowOptSlide from './MenuRowOptSlide'

// const defaultRows = () => [false, false, false, false, false]

export default {
  name: 'Context',
  components: {
    // ProjectCreate,
    // ProjectRename,
    // ProjectDelete,
    // ProjectSelect,
    // MenuRowOptSlide
  },
  data () {
    return {
      context: 0,
      modes: ['projects', 'tasks']
    }
  },
  computed: {
    mode: function () {
      return this.modes[this.context]
    },
    altMode: function () {
      return this.modes[this.changeContext(this.context + 1)]
    }
  },
  methods: {
    tglContext: function () {
      this.context = this.changeContext(this.context + 1)
      this.$emit('MODE', this.mode)
    },
    changeContext: function (input) {
      if (input >= this.modes.length) {
        input = 0
      }
      return input
    },
    getBtnClass: function (input) {
      if (this.mode === this.modes[input]) {
        return 'active'
      }
      return ''
    }
  }
}
</script>
