import Vue from 'vue'
Vue.component('roll-item', {
  template: `<div>
  <div class="container">
  <div class="image-list">
    <div v-for="item in imageList" v-bind:key="item.index" class="image-item">
      <img :src=item alt="">
    </div>
    <button @click="changeStatus">changeStatus</button>
  </div>
  </div>
</div>`,
  data() {
    return {
      membersNum: [1, 2, 3, 4],
      imageList: [],
      isStop: false,
      roll: null
    }
  },
  mounted: function () {
    // 将数组打乱
    this.membersNum.sort(this.randomsort);
    // this.membersNum = this.membersNum.concat(this.membersNum)
    this.renderImageList();

    // 滚动
    this.run();
  },
  watch: {
    isStop: function (val) {
      if (val) {
        this.stop();
      } else {
        this.run();
      }
    }
  },
  methods: {
    changeStatus: function () {
      this.isStop = !this.isStop;
    },
    stop: function (params) {
      clearInterval(this.roll);
      if (this.isStop) {
        let time = 0;
        for (let i = 1; i <= 10; i++) {
          (i => {
            time = i * 50 + time;
            setTimeout(() => {
              let item = this.imageList.pop();
              this.imageList.unshift(item);
            }, time);
          })(i);
        }
      }
    },
    run: function () {
      this.roll = setInterval(() => {
        let item = this.imageList.pop();
        this.imageList.unshift(item);
      }, 100);
    },
    randomsort: function (a, b) {
      //用Math.random()函数生成0~1之间的随机数与0.5比较，返回-1或1
      return Math.random() > 0.5 ? -1 : 1;
    },
    renderImageList: function () {
      this.imageList = [];
      this.membersNum.forEach(e => {
        this.imageList.push(`./src/assets/img${e}.jpg`);
      });
    }
  }
});
