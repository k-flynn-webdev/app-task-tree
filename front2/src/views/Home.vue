<template>
  <section>

    <router-link :to="{ name: 'projects' }" class="has-text-link">
      Projects
    </router-link>
    <router-link :to="{ name: 'plans' }" class="has-text-link">
      Plans
    </router-link>
    <router-link :to="{ name: 'tasks' }" class="has-text-link">
      Tasks
    </router-link>


    <div class="container">

      <div class="columns is-centered">

        <div class="column is-8 has-text-light has-text-centered">

          <p class="is-size-4 has-text-weight-bold is-uppercase">
            Welcome to Minitask
          </p>

          <p class="is-size-5">
            A simple, fast, easy and shareable todo list.
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
  }
}
</script>
