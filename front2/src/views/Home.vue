<template>
  <section>

    <div class="container">

      <p class="is-size-2 has-text-centered has-text-weight-bold has-text-light">
        Minitask
      </p>

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

          <div class="">
            <router-link class="has-text-link"
                         :to="{ name: 'login' }">
              Login
            </router-link>
            <router-link class="has-text-link"
                         :to="{ name: 'create' }">
              Create
            </router-link>

            <b-button type="is-link">
              Try
            </b-button>

          </div>

        </div>

      </div>

    </div>

    <div>

    </div>

  </section>
</template>

<script>

export default {
  name: 'Home'
}
</script>
