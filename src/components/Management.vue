<template>
  <div class="container">
    <div>添加成员</div>
    <div class="form">
      <input type="text" v-model="num" placeholder="工号">
      <input type="text" v-model="name" placeholder="姓名">
      <input v-model="sign" placeholder="标记" />

      <button @click="add">添加</button>
    </div>
  </div>

</template>
<script>
export default {
  name: "Management",
  data() {
    return {
      member: [],
      num: null,
      name: null,
      sign: null
    };
  },
  methods: {
    add: function() {
      console.log("------------------------------------");
      console.log(this.num);
      console.log("------------------------------------");
    }
  }
};
</script>
<style scoped>
.container {
  width: 900px;
}
.form {
}
</style>
