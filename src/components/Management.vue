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
        <b-button size="" variant="primary" @click="add" :disabled="disabled">添加</b-button>
      </div>
    </div>
    <div class="title list-title">成员列表</div>
    <div><b-button size="" variant="primary" @click="presave" class="pre-save">预设列表存入</b-button></div>
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
      <!-- <b-button size="" variant="primary" @click="addNum">添加工号</b-button> -->
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
  mounted: function() {
    if (localStorage.getItem("memberList"))
      this.memberList = JSON.parse(localStorage.getItem("memberList"));
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
      this.memberList.join(",");
      let _memberList = JSON.stringify(this.memberList);
      localStorage.setItem("memberList", _memberList);
      if (localStorage.getItem("memberList") == _memberList) {
        alert("保存成功");
      }

      // let _numList = [];
      // this.memberList.forEach(it => {
      //   _numList.push(it);
      // });
      // localStorage.setItem("joinList", _numList);
    },
    deleteAll: function() {
      this.memberList = [];
      localStorage.removeItem("memberList");
    },
    presave: function() {
      this.deleteAll();
      let _memberList =
        '[{"num":"009","name":"哇哈哈","sign":true},{"num":"003","name":"dede","sign":true},{"num":"001","name":"不过","sign":true},{"num":"004","name":"你倒是","sign":true},{"num":"002","name":"哇地所","sign":true},{"num":"006","name":"挖4 ","sign":true}]';
      localStorage.setItem("memberList", _memberList);
      this.memberList = JSON.parse(localStorage.getItem("memberList"));
    },
    // addNum: function() {
    //   localStorage.removeItem('joinList')
    //   localStorage.setItem("joinList", "001,002,003,004,006,009");
    // }
  }
};
</script>
<style scoped>
.container {
  width: 900px;
}
.title {
  text-align: left;
  margin: 60px 0 10px;
  font-size: 22px;
}
.list-title {
  width: 200px;
  float: left;
}
.btn-group {
  text-align: right;
  float: right;
}
.pre-save {
  float: right;
  margin-top: 50px;
}
</style>
