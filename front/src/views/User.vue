<template>
  <div class="user relative">

    <router-link to="/" title="go to home" class="user__home">
      <p class="upper text-bold">Home</p>
    </router-link>

    <br>

    <Card class="user__card max-30">

      <div class="text-center ">
        <p class="upper text-bold display-inline-b">
          Create
        </p>
      </div>

      <form class="user__form">
        <div class="input-control">
          <label>
            <p>Name</p>
            <input required
                   v-model="form.name"
                   type="string"
                   minlength="4" >
          </label>
        </div>

        <div class="input-control">
          <label>
            <p>Email</p>
            <input
              required
              v-model="form.email"
              type="email"
            >
          </label>
        </div>

        <div class="input-control">
          <label>
            <p>Password</p>
            <input required
                   v-model="form.password"
                   type="password"
                   minlength="7" >
          </label>
        </div>

        <div class="user__form__accept">
          <button class="user__form__accept-btn">
            OK
          </button>

        </div>
      </form>

    </Card>

  </div>
</template>

<script>
import Card from '../components/general/Card'

export default {
  name: 'User',
  components: {
    Card
  },
  data () {
    return {
      form: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  computed: {
    user: function () {
      return this.$store.getters['user/user']
    }
  }
}
</script>
