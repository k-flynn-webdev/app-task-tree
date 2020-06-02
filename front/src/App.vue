<template>
  <div id="app">

    <div class="title">
      <p>title here</p>
    </div>

    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/task">Task</router-link>
    </div>

    <router-view/>

    <div class="footer">
      <p>footer here</p>
    </div>

  </div>
</template>
