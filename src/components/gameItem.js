import Vue from 'vue'
import { memberList} from '../data/data'
Vue.component('game-item', {
  template: `
  <div>
    <div class="imageList" >
      <div v-for="item in membersNum" class="image-item">
        <img :src=getImgSrc(item) alt="" class="avatar">
        <div class="name game-name ">{{originList[item].name}}</div>
      </div>
    </div>
   
    </div>`,
  data() {
    return {
      membersNum: [],
      imageList: [],
      roll: null,
      membersListStr: '',
      membersNum: [],
      originList: {}
    }
  },
  mounted: function () {
    // this.init()
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
      // this.isStop = this.isStop ? true : false
      this.membersNum = []
      // 工号数组
      let randomList = JSON.parse(this.membersListStr).sort(this.randomsort)
      this.originList = this.getAllMemberList()

      // 整理数组格式
      // let list  = this.getJoinMemberList()
      this.membersNum = randomList
    },
    stop: function (params) {
      clearInterval(this.roll)
      if (this.isStop) {
        let time = 0
        let delay = 2 // 从回车到停下时持续时间
        for (let i = 1; i <= delay; i++) {
          (i => {
            time = i * 100 + time
            setTimeout(() => {
              if (i == delay) {
                let membersNum = this.membersNum

                let deleteItem = membersNum.pop()
                this.updataMemberList(this.membersNum, deleteItem)
                this.membersNum = [deleteItem]
              } else {
                let item = this.membersNum.pop()
                this.membersNum.unshift(item)
                this.membersListStr = this.getJoinMemberList()
              }
            }, time)
          })(i)
        }
      }
    },
    run: function () {
      this.membersListStr = this.getJoinMemberList()

      this.roll = setInterval(() => {
        let newItem = this.membersNum.pop()
        this.membersNum.unshift(newItem)
      }, 100)
    },
    randomsort: function (a, b) {
      // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      return Math.random() > 0.5 ? -1 : 1
    },
    getAllMemberList: function () {
      let list = JSON.parse(localStorage.getItem('memberList'))
      let obj = {}
      list.forEach(it => {
        obj[it.num + ''] = it
      })

      return obj
    },
    getJoinMemberList: function (params) {
      return localStorage.getItem('playGame')
    },
    getImgSrc: function (num) {
      // 100', '101', '102', '103', '104', '105','150', '151', '152', '153', '154'
      let man = ['100', '101', '102', '103', '104', '105', '150','151', '152', '154']
      let women = [  '153']
      // 非CF 且 男同志
      if (man.indexOf(num) > -1) {
        return `./src/assets/man.jpg`
      }
      // 非CF 且 女同志
      if (women.indexOf(num) > -1) {
        return `./src/assets/women.jpg`
      }
      return `./src/assets/${num}.jpg`
    },
    updataMemberList: function (list, item) {
      let index = list.indexOf(item)
      list.splice(index, 1)
      localStorage.removeItem('playGame')
      localStorage.setItem('playGame', JSON.stringify(list))
    }
  }
})
