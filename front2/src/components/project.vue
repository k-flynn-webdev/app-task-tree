<template>
  <div class="column is-flex start is-8 is-12-mobile px-0 pt-0 pb-3">

    <div class="flex-grow is-flex start has-text-light is-radius"
    :class="[ isEdit? 'has-background-transparent has-border-light':
    'has-border-transparent has-background-mid' ]">

      <span class="row__content-progress">
        {{ progress }}
      </span>

      <p v-if="!isEdit"
         class="pad has-border-transparent is-family-sans-serif">
        {{ project.value }}
      </p>
      <b-input v-else
               class="flex-grow is-family-sans-serif"
               :placeholder="project.value"
               :value="project.value"
               :readonly="!isEdit"
               type="textarea"
               customClass="row__content-input pad has-text-light">
      </b-input>
    </div>

    <b-button class="mx-0 is-transparent"
              @click="isEdit = !isEdit">
      <svg class="icon btn-options" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
        <path d="M0,155.556l178.182,0l21.818,44.444l-180,0l-20,-44.444Zm0,-77.778l178.182,0l21.818,44.444l-180,0l-20,-44.444Zm0,-77.778l178.182,0l21.818,44.444l-180,0l-20,-44.444Z" />
      </svg>
    </b-button>

  </div>

</template>

<script>

const defaultProject = () => {
  return {
    id: 0,
    owner: 0,
    progress: 0,
    total: 0,
    value: '',
    is_done: false,
  }
}

export default {
  name: 'project',

  data () {
    return {
      isEdit: false
    }
  },

  computed: {
    progress () {
      return this.renderProgressPercent(
          this.project.progress, this.project.total)
    }
  },

  props: {
    project: {
      type: Object,
      default: defaultProject
    }
  },

  methods: {
    /**
     * Render the progress from a object
     *
     * @param {number} done
     * @param {number} total
     * @returns {string}  eg `77%`
     */
    renderProgressPercent (done, total) {
      if (!total || total === 0) return '0%'
      if (!done || done === 0) return '0%'
      const finalNum = Math.floor((done / total) * 100)
      return `${finalNum.toString()}%`
    }
  }
}
</script>
