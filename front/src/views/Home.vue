<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>

    <form action="/api/user" method="POST">

      <input type="text" name="name" placeholder="name" required>
      <input type="email" name="email" placeholder="email" required>
      <input type="password" name="password" placeholder="password" required minlength="6">

      <button>send</button>

    </form>

    <form action="/api/user/login" method="POST">

      <input type="text" name="email" placeholder="email" required>
      <input type="text" name="password" placeholder="password" required minlength="6">

      <button>send</button>

    </form>

    <form action="/api/user/byemail" method="POST">

      <input type="text" name="email" placeholder="">

      <button>test get by email</button>

    </form>

    <div>

      <input type="text" name="token" placeholder="" v-model="userToken">

<!--      <button @click="postTest">test</button>-->
<!--      <button @click="postLogout">logout</button>-->

    </div>

  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      userTest: 'token here',
      userToken: 'token here'
    }
  },
  methods: {
  }
}
</script>
