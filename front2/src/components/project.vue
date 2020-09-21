<template>
  <b-field>
    <b-checkbox :value="project.is_done" class="control" />

    <b-input class=""
             :placeholder="project.value"
             :value="project.value"
             :readonly="!canEdit"
             type="text"
             expanded>
    </b-input>

    <p class="control">
      <button class="button is-primary"
        @click="canEdit = !canEdit">
        <svg class="icon" viewBox="0 0 200 200" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
          <path d="M0,155.556l178.182,0l21.818,44.444l-180,0l-20,-44.444Zm0,-77.778l178.182,0l21.818,44.444l-180,0l-20,-44.444Zm0,-77.778l178.182,0l21.818,44.444l-180,0l-20,-44.444Z" />
        </svg>
      </button>
    </p>
  </b-field>
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
      canEdit: false
    }
  },

  props: {
    project: {
      type: Object,
      default: defaultProject
    }
  }
}
</script>
