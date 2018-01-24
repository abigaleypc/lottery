<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "app"
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.firstPrice .image-item {
  position: absolute;
  width: 150px;
  height: 150px;
  background: #fcd052;
  left: 340px;
}
.firstPrice .num {
  background: #fcd052;
  position: absolute;
  left: 166px;
  top: 90px;
  font-size: 22px;
}
.firstPrice .name {
  background: #fcd052;
  position: absolute;
  left: 166px;
  top: 115px;
  width: 100px;
  text-align: left;
  font-size: 22px;
}
.imageList {
  position: relative;
  width: 100px;
  margin-right: 65px;
}

.image-item {
  position: absolute;
  width: 100px;
  height: 100px;
  background: #fcd052;
}

.image-item img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
}
.center {
  margin: 0 auto;
  text-align: center;
}
.name,
.num {
  background: #fcd052;
}
.game-name {
  background: #fcefd3
}
</style>
