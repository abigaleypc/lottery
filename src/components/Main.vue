<template>
<div>
  <div class="roll-item">
    <roll-item :isStop='isStopArr[item]' v-for="(item,index) in tempList" :key="item.index" :sign='signIndex==index?"fjj":"cf"'>{{isStopArr[item]}}</roll-item>
  </div>
  <div v-for="item in tempList" :key="item.index">{{current}} : {{item}}</div>
 <button @click="enter">{{isStop?'跑起来':'停下'}}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tempList: [],
      isStopArr: [],
      index: -1,
      current: "third",
      rankKey: [],
      isStop: false,
      signIndex: 0
    };
  },
  mounted: function() {
    localStorage.removeItem("rank");
    let tempList = {
      first: [1],
      second: [5],
      third: [5, 5]
    };
    localStorage.setItem("rank", JSON.stringify(tempList));

    let list = localStorage.getItem("rank");
    if (list) {
      this.rankList = JSON.parse(list);
      this.rankKey = Object.keys(this.rankList);
    }

    this.init();
  },
  watch: {},
  methods: {
    init: function() {
      this.$set(this, "tempList", []);
      this.tempList = [];
      this.isStopArr = [];
      this.membersListLen = this.rankList[this.current].shift();
      this.rankList;
      this.index = -1;
      for (let i = 0; i < this.membersListLen; i++) {
        this.tempList.push(i);
      }

      // 是否需要包含fjj jy
      if (!localStorage.getItem("fjjSign")) {
        localStorage.setItem("fjjSign", true);
        this.signIndex = Math.floor(Math.random() * 5);
      }
    },
    enter: function() {
      this.isStop = !this.isStop;
      if (this.isStop) {
        this.stop();
      } else {
        this.run();
      }
    },
    run: function() {
      this.changeCurrentKey();
      this.init();
    },
    stop: function() {
      let timer = setInterval(() => {
        ++this.index;
        this.isStopArr.push(true);
        if (this.index >= this.membersListLen) {
          clearInterval(timer);
        }
      }, 1000);
    },
    changeCurrentKey: function() {
      let len = this.rankList[this.current].length;
      if (len > 0) {
        return;
      } else {
        this.rankKey.pop();
        this.current = this.rankKey[this.rankKey.length - 1];
      }
    }
  }
};
</script>

<style scoped>
.roll-item {
  /* width: 100px; */
  display: flex;
  flex-direction: row;
}
</style>
