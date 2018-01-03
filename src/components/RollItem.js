import Vue from 'vue'
import { memberList } from '../data/data'
Vue.component('roll-item', {
  template: `
  <div class="image-list">
  {{isStop}}
   
    <div v-for="item in membersNum" class="image-item">
    <img :src=getImgSrc(item) alt="">
    <div class="name">{{originList[item].name}}</div>
    <div class="num">{{item}}</div>
    </div>
</div>`,
  data() {
    return {
      membersNum: [],
      imageList: [],
      roll: null,
      membersListStr: '',
      membersNum: [],
      memberListObj: {},
      originList: {}
    }
  },
  mounted: function () {
    this.membersListStr = this.getGlobalList()
    this.init()
    // 滚动
    this.run()
  },
  props: ['isStop'],
  watch: {
    isStop: function (val) {
      if (val) {
        this.stop()
      } else {
        this.run()
      }
    },
    membersListStr: function (val) {
      // 当全局人员列表更新时，初始化数据
      this.init()
    }
  },
  methods: {
    init: function () {
      this.memberListObj = {}
      this.membersNum = []
      // 工号数组
      let randomList = JSON.parse(this.membersListStr).sort(this.randomsort)
      this.originList = memberList
      // 整理数组格式
      randomList.forEach(it => {
        this.membersNum.push(it.num)
        this.memberListObj[it.num] = it
      })
    },
    stop: function (params) {
      clearInterval(this.roll)
      if (this.isStop) {
        let time = 0
        let delay = 3 // 从回车到停下时持续时间
        for (let i = 1; i <= delay; i++) {
          (i => {
            time = i * 50 + time
            setTimeout(() => {
              if (i == delay) {
                let deleteItem = this.membersNum.pop()
                this.updataMemberList(this.membersNum)
                this.membersNum = [deleteItem]

              }else {
                let item = this.membersNum.pop()
                this.membersNum.unshift(item)
                this.membersListStr = this.getGlobalList()
              }
            }, time)
          })(i)
        }
      }
    },
    run: function () {
      this.roll = setInterval(() => {
        let newItem = this.membersNum.pop()
        this.membersNum.unshift(newItem)
      }, 100)
    },
    randomsort: function (a, b) {
      // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      return Math.random() > 0.5 ? -1 : 1
    },
    getGlobalList: function () {
      return localStorage.getItem('memberList')
    },
    getImgSrc: function (num) {
      return `./src/assets/${num}.jpg`
    },
    updataMemberList: function (newNumList) {
      let newObjList = []
      newNumList.forEach(it => {
        newObjList.push(this.memberListObj[it])
      })
      if (newObjList.length == newNumList.length) {
        localStorage.removeItem('memberList')
        localStorage.setItem('memberList', JSON.stringify(newObjList))
      }
    }
  }
})
