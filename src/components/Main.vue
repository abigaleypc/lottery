<template>
<div>
  <div class="roll-item">
    <roll-item :isStop='isStopArr[item]' v-for="item in tempList" :key="item.index">{{isStopArr[item]}}</roll-item>
  </div>
 <button @click="enter">{{isStop?'跑起来':'停下'}}</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      membersNum: [1, 2, 3, 4],
      tempList: [],
      isStopArr: [],
      index: -1,
      current: "third",
      rankKey: [],
      isStop: false
    };
  },
  mounted: function() {
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
      this.tempList = [];
      this.isStopArr = [];
      this.membersListLen = this.rankList[this.current].shift();
      this.rankList;
      for (let i = 0; i < this.membersListLen; i++) {
        this.tempList.push(i);
      }
    },
    enter: function() {
      this.isStop = !this.isStop;
      if (this.isStop) {
        let timer = setInterval(() => {
          ++this.index;
          this.isStopArr.push(true);
          if (this.index >= this.membersListLen) {
            clearInterval(timer);
          }
        }, 1000);
      } else {
        this.getNext();
        this.init();
      }
    },
    getNext: function() {
      // this.rankKey

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
