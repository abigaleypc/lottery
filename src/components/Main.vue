<template>
<div>
  <div class="roll-item">
    <roll-item :isStop='isStopArr[0]'></roll-item>
    <roll-item :isStop='isStopArr[1]'></roll-item>
    <roll-item :isStop='isStopArr[2]'></roll-item>
  </div>
 <button @click="enter">enter</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      membersNum: [1, 2, 3, 4],
      childNum: 3,
      isStopArr: [],
      index: -1
    };
  },
  mounted: function() {
    localStorage.setItem("memberList", "1,2,3,4");
  },
  watch: {},
  methods: {
    enter: function() {
      let timer = setInterval(() => {
        ++this.index;
        this.isStopArr.push(true);
        if (this.index >= this.childNum) {
          clearInterval(timer);
        }
      }, 1000);
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
