<template>
  <div id="app">

    <navbar />

<!--    <div id="nav">-->
<!--      <router-link to="/">Home</router-link> |-->
<!--      <router-link to="/about">About</router-link> |-->
<!--      <router-link to="/create">Create</router-link>-->
<!--    </div>-->
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/navbar'

export default {
  name: 'App',

  components: {
    navbar
  }
}
</script>
