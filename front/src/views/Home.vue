<template>
  <section class="my-1 pb-3">

    <div class="is-relative container">
      <div class="is-inline-block select-bar home">
        <b-button class="is-size-7-tablet has-background-primary"
                  @click="gotoProjects">
          Projects
        </b-button>
        <b-button class="is-size-7-tablet"
                  disabled>
          Plans
        </b-button>
        <b-button class="is-size-7-tablet"
                  disabled>
          Tasks
        </b-button>
      </div>
    </div>

    <div class="container">

      <div class="columns is-centered">

        <div class="column is-8 has-text-light has-text-centered">

          <p class="is-size-4 has-text-weight-bold is-uppercase">
            Welcome to Minitask
          </p>

          <p class="is-size-5">
            A simple, fast, no-frills task manager.
          </p>

          <p class="is-size-6">
            To get started, choose a option from below.
          </p>

        </div>

      </div>

    </div>

  </section>
</template>

<script>
import { TYPES } from '../constants'

export default {
  name: 'Home',

  created () {
    this.$store.commit('mode', TYPES['home'])
    this.$store.commit('setOpened', {})
  },

  methods: {
    gotoProjects () {
      this.$router.push({ name: 'project' })
    }
  }
}
</script>
