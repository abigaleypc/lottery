<template>
  <div class="container">
    <div class="title">添加成员</div>
    <div class="form row">
      <div class="col-xs-4 col-md-4">
        <b-form-input type="number" v-model="num" required placeholder="工号">
        </b-form-input>
      </div>
      <div class="col-xs-4 col-md-4">
        <b-form-input type="text" v-model="name" required placeholder="姓名">
        </b-form-input>
      </div>
      <div class="col-xs-2 col-md-2">
        <b-form-checkbox v-model="sign">CF员工</b-form-checkbox>
      </div>
      <div class="col-xs-2 col-md-2">
        <b-button size="sm" variant="primary" @click="add" :disabled="disabled">添加</b-button>
      </div>

      <!-- <button @click="add" :disabled="disabled">添加</button> -->
    </div>
    <div class="title list-title">成员列表</div>
    <table aria-busy="false" aria-colcount="4" class="table b-table table-striped table-hover" id="__BVID__463_">
      <!---->
      <!---->
      <thead class="">
        <tr>
          <th aria-colindex="1" class="">工号</th>
          <th aria-colindex="2" class="">姓名</th>
          <th aria-colindex="3" class="">是否CF员工</th>
          <th aria-colindex="4" class="">操作</th>
        </tr>
      </thead>
      <!---->
      <tbody class="">
        <!---->
        <tr class="" v-for="item in memberList" :key="item.index">
          <td aria-colindex="1" class="">{{item.num}}</td>
          <td aria-colindex="2" class="">{{item.name}}</td>
          <td aria-colindex="3" class="">{{item.sign?'CF员工':'非CF员工'}}</td>
          <td aria-colindex="4" class=""><b-button size="sm" variant="danger"  @click="deleteItem(item)">删除</b-button></td>
        </tr>
      </tbody>
    </table>
    <div class="btn-group">
      <b-button size="" variant="primary" @click="save">保存</b-button>
      <b-button size="" variant="" @click="deleteAll">整表删除</b-button>
    </div>
  </div>

</template>
<script>
export default {
  name: "Management",
  data() {
    return {
      memberList: [],
      num: null,
      name: null,
      sign: true,
      disabled: true
    };
  },
  watch: {
    num: function(val) {
      if (val && this.name) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
    name: function(val) {
      if (val && this.num) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    }
  },
  methods: {
    init: function() {
      this.num = null;
      this.name = null;
      this.sign = true;
    },
    add: function() {
      this.memberList.push({
        num: this.num,
        name: this.name,
        sign: this.sign
      });
      this.init();
    },
    deleteItem: function(item) {
      let index = this.memberList.indexOf(item);
      this.memberList.splice(index, 1);
    },
    save: function() {
      this.memberList.join(',');
      debugger
    },
    deleteAll: function() {}
  }
};
</script>
<style scoped>
.container {
  width: 900px;
}
.title {
  text-align: left;
  margin: 20px 0 10px;
  font-size: 22px;
}
.btn-group {
  text-align: right;
  float: right;
}
</style>
