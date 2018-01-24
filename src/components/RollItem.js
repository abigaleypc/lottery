import Vue from 'vue'
import { memberList} from '../data/data'
Vue.component('roll-item', {
  template: `
  <div>
    <div v-bind:class="{imageList:(current!='first') }" v-if="current!='first'" >
      <div v-for="item in membersNum" class="image-item">
        <img :src=getImgSrc(item) alt="" class="avatar">
        <div class="num">{{item}}</div>
        <div class="name">{{originList[item].name}}</div>
      </div>
    </div>
    <div v-bind:class="{firstPrice:(current=='first') }" v-if="current=='first'">
      <div v-for="item in membersNum" class="image-item">
        <img :src=getImgSrc(item) alt="" class="avatar">
        <div class="num">{{item}}</div>
        <div class="name">{{originList[item].name}}</div>
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
  props: ['isStop', 'sign', 'current'],
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
                let membersNum
                if (this.sign == 'fjj') {
                  membersNum = this.membersNum.filter(it => (it > 99 && it < 151))
                } else if (this.sign == 'jy') {
                  membersNum = this.membersNum.filter(it => (it > 150))
                } else {
                  membersNum = this.membersNum.filter(it => (!(it > 99)))
                }
                let deleteItem = membersNum.pop()
                this.updataMemberList(this.membersNum, deleteItem)
                this.membersNum = [deleteItem]
              } else {
                // if(this.props=='fjj')

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
      }, 600)

      // 4900ms之后刚好到音乐启动时 速度加快
      setTimeout(() => {
        clearInterval(this.roll)
        this.roll = setInterval(() => {
          let newItem = this.membersNum.pop()
          this.membersNum.unshift(newItem)
        }, 100)
      }, 4900)
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
      return localStorage.getItem('joinNumList')
    },
    getImgSrc: function (num) {
      // 100', '101', '102', '103', '104', '105','150', '151', '152', '153', '154'
      let man = ['100', '101', '102', '103', '104', '105', '150', '151', '152', '154']
      let women = [ '153']
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
      localStorage.removeItem('joinNumList')
      localStorage.setItem('joinNumList', JSON.stringify(list))
    }
  }
})
