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

.image-list {
  position: relative;
  width: 100px;
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
