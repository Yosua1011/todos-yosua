<template>
  <div id="app">
    <div id="imgvue">
      <img src="./assets/logo.png" width="10%">
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, 'sans-serif';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#imgvue {
  text-align: center;
}
body {
  background-image: url("../static/1.jpg");
}
</style>
