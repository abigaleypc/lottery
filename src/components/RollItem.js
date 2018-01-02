import Vue from 'vue'
Vue.component('roll-item', {
  template: `
  <div class="image-list">
  {{isStop}}
    <div v-for="item in imageList" v-bind:key="item.index" class="image-item">
      <img :src=item alt="">
    </div>
</div>`,
  data() {
    return {
      membersNum: [],
      imageList: [],
      roll: null,
      membersListStr: ''
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
      this.membersNum = this.membersListStr.split(',')
      // 将数组打乱
      this.membersNum.sort(this.randomsort)
      this.renderImageList()
    },
    changeStatus: function () {
      this.isStop = !this.isStop
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
              let item = this.imageList.pop()
              this.imageList.unshift(item)
              this.membersListStr = localStorage.getItem('memberList')
              if (i == delay) {
                // 当停下时  更新localStorage中的人员列表 
                let lastItemNum = this.imageList[this.imageList.length - 1].match(/\/img(.+)\./)[1]
                let index = this.membersNum.indexOf(lastItemNum)
                this.membersNum.splice(index, 1)
                let _membersListStr = this.membersNum.join(',')
                localStorage.setItem('memberList', _membersListStr)
              }
            }, time)
          })(i)
        }
      }
    },
    run: function () {
      this.roll = setInterval(() => {
        let item = this.imageList.pop()
        this.imageList.unshift(item)
      }, 100)
    },
    randomsort: function (a, b) {
      // 用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      return Math.random() > 0.5 ? -1 : 1
    },
    renderImageList: function () {
      this.imageList = []
      this.membersNum.forEach(e => {
        this.imageList.push(`./src/assets/img${e}.jpg`)
      })
    },
    getGlobalList: function () {
      return localStorage.getItem('memberList')
    }
  }
})
