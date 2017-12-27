<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.container {
  position: relative;
}
.image-list {
  /* position: absolute;
  width: 100px; */
  /* height: 100px; */
  /* overflow: hidden; */
  /* transition: top .3s ease; */
  /* top: 0px; */
}

.image-item {
  position: absolute;
  width: 100px;
  height: 100px;
  background: white;
}

.image-item img {
  width: 100%;
  height: 100%;
}
</style>
