<template>
  <div>
    <div class="container">
      <div class="title">参与人员工号</div>
      <div class="form row">
        <div class="col-xs-6 col-md-6">
          <b-form @submit="addJoinNum">
            <b-form-input type="number" v-model="joinNum" required placeholder="工号">
            </b-form-input>
          </b-form>
        </div>
        <div class="col-xs-6 col-md-6">
          <div class="btn-group">
            <!-- <b-button size="" variant="primary" @click="saveJoinNumList">保存</b-button> -->
            <b-button size="" variant="primary" @click="editJoinNumList">{{isEdit?'保存':'编辑'}}</b-button>
            <b-button size="" variant="danger" @click="deleteJoinNumAll">整表删除</b-button>
          </div>
        </div>
      </div>
      <div class="tip pull-left left row">{{tip}}</div>

      <div class="title row">成员列表</div>
      <div class="row">
        <div v-for="item in joinNumList" :key="item.index" class="col-xs-2 col-md-2">
          {{item}} : {{getNameByNum(item)}} 
          <b-button size="sm" variant="danger" @click="deleteJoinItem(item)" v-show="isEdit">X</b-button>
        </div>
      </div>
    </div>
    <hr />
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
          <b-form-select v-model="company" :options="options" class="mb-3">
          </b-form-select>
          <!-- <b-form-checkbox v-model="company">所属公司</b-form-checkbox> -->
        </div>
        <div class="col-xs-2 col-md-2">
          <b-button size="" variant="primary" @click="add" :disabled="disabled">添加</b-button>
        </div>
      </div>
      <div class="title list-title">成员列表</div>
      <div>
        <b-button size="" variant="primary" @click="presave" class="pre-save">预设列表存入</b-button>
      </div>
      <table aria-busy="false" aria-colcount="4" class="table b-table table-striped table-hover" id="__BVID__463_">
        <!---->
        <!---->
        <thead class="">
          <tr>
            <th aria-colindex="1" class="">工号</th>
            <th aria-colindex="2" class="">姓名</th>
            <th aria-colindex="3" class="">所属公司</th>
            <th aria-colindex="4" class="">操作</th>
          </tr>
        </thead>
        <!---->
        <tbody class="">
          <!---->
          <tr class="" v-for="item in memberList" :key="item.index">
            <td aria-colindex="1" class="">{{item.num}}</td>
            <td aria-colindex="2" class="">{{item.name}}</td>
            <td aria-colindex="3" class="">{{getCompany(item.company)}}</td>
            <td aria-colindex="4" class="">
              <b-button size="sm" variant="danger" @click="deleteItem(item)">删除</b-button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="btn-group">
        <!-- <b-button size="" variant="primary" @click="save">保存</b-button> -->
        <b-button size="" variant="danger" @click="deleteAll">整表删除</b-button>
      </div>
    </div>
  </div>
</template>
<script>
import { memberList, memberNumList } from "../data/data";
export default {
  name: "Management",
  data() {
    return {
      memberList: [],
      num: null,
      name: null,
      disabled: true,
      joinNumList: [],
      joinNum: "",
      tip: "",
      isEdit: false,
      company: "cf",
      options: [
        { value: "cf", text: "CF" },
        { value: "fjj", text: "富金机" },
        { value: "jy", text: "巨忆" }
      ]
    };
  },
  mounted: function() {
    // localStorage.setItem("total", "5,5,5,1");

    if (localStorage.getItem("memberList")) {
      let list = JSON.parse(localStorage.getItem("memberList"));
      list.sort(function(a, b) {
        if (+a.num < +b.num) {
          return -1;
        } else {
          return 1;
        }
      });
      this.memberList = list;
    }
    if (localStorage.getItem("joinNumList")) {
      let list = JSON.parse(localStorage.getItem("joinNumList"));
      list.sort(function(a, b) {
        if (+a < +b) {
          return -1;
        } else {
          return 1;
        }
      });
      this.joinNumList = list;
    }
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
      this.company = "cf";
    },
    add: function() {
      this.memberList.push({
        num: this.num,
        name: this.name,
        company: this.company
      });
      this.init();
      this.save();
    },
    deleteItem: function(item) {
      let index = this.memberList.indexOf(item);
      this.memberList.splice(index, 1);
      this.save();
    },
    save: function() {
      localStorage.removeItem("memberList");
      this.memberList.join(",");
      let _memberList = JSON.stringify(this.memberList);
      localStorage.setItem("memberList", _memberList);
    },
    deleteAll: function() {
      this.memberList = [];
      localStorage.removeItem("memberList");
    },
    presave: function() {
      this.deleteAll();
      localStorage.setItem("memberList", JSON.stringify(memberList));
      this.memberList = JSON.parse(localStorage.getItem("memberList"));

      localStorage.removeItem("joinNumList");
      localStorage.setItem("joinNumList", JSON.stringify(memberNumList));
      this.memberNumList = JSON.parse(localStorage.getItem("joinNumList"));
    },
    addJoinNum: function() {
      this.tip = "";
      setTimeout(() => {
        this.tip = "";
      }, 1000);
      // joinNum
      if (this.joinNumList.indexOf(this.joinNum) > -1) {
        return (this.tip = "不可重复录入");
      } else {
        let item = this.memberList.filter(it => it.num == this.joinNum);
        if (!item || item.length < 1) {
          return (this.tip = "不存在该工号，如需录入该人员信息，请于页面下面模块录入");
        } else {
          this.joinNumList.push(this.joinNum);
          this.joinNum = null;
          this.saveJoinNumList();
        }
      }
    },
    getNameByNum: function(num) {
      let item = this.memberList.filter(it => it.num == num);
      if (item && item.length > 0) {
        return item[0].name;
      } else {
        return "error";
      }
    },
    saveJoinNumList: function() {
      localStorage.removeItem("joinNumList");
      this.joinNumList.join(",");
      let _joinNumList = JSON.stringify(this.memberNumList);
      localStorage.setItem("joinNumList", _joinNumList);
    },
    deleteJoinNumAll: function() {
      this.joinNumList = [];
      localStorage.removeItem("joinNumList");
    },
    deleteJoinItem: function(item) {
      let index = this.joinNumList.indexOf(item);
      this.joinNumList.splice(index, 1);
      this.saveJoinNumList();
    },
    editJoinNumList: function() {
      this.isEdit = !this.isEdit;
      if (this.isEdit) {
        this.saveJoinNumList();
      }
    },
    getCompany: function(str) {
      return this.options.filter(it => it.value == str)[0].text;
    }
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
.tip {
  color: red;
}
</style>
