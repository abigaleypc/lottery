<template>
  <div class="bg">
    <div class="info-section">
      <div>
        <h1 v-if="current=='third'"><img src="../assets/sources/3Price.png"/></h1>
        <h1 v-if="current=='second'"><img src="../assets/sources/2Price.png"/></h1>
        <h1 v-if="current=='first'"><img src="../assets/sources/1Price.png"/></h1>
      </div>
      <div class="roll-item">
        <roll-item :isStop='isStopArr[item]' v-for="(item,index) in tempList" :key="item.index" :sign='signIndex==index ? signCompany : "cf"' :current='current'>{{isStopArr[item]}}</roll-item>
      </div>
    </div>
    <div>
      <audio autoplay ref="bgMusic">
        <source src="../assets/sources/bg.mp3" type="audio/mpeg">
      </audio>
      <audio  ref="stopMusic">
        <source src="../assets/sources/stop.mp3" type="audio/mpeg">
      </audio>
    </div>
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
      signIndex: -1,
      signCompany: null
    };
  },
  created:function(){
 
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

    window.addEventListener('keyup', (ev) => {
      console.log(ev.keyCode)
      if(ev.keyCode==13){
          this.enter()
        }
    })

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
        this.signCompany = "fjj";
      } else if (!localStorage.getItem("jySign")) {
        localStorage.setItem("jySign", true);
        this.signIndex = Math.floor(Math.random() * 5);
        this.signCompany = "jy";
      } else {
        this.signIndex = -1;
      }
    },
    enter: function() {
      this.isStop = !this.isStop;
      if (this.isStop) {
        this.$refs.bgMusic.pause();
        this.$refs.bgMusic.currentTime = 0;
        this.$refs.stopMusic.play()
          this.stop();
        
      } else {
        this.$refs.bgMusic.play()
        this.$refs.stopMusic.pause();
        this.$refs.stopMusic.currentTime = 0;
        this.run();
      }
    },
    run: function() {
      this.changeCurrentKey();
      this.init();
    },
    stop: function() {
      setTimeout(()=>{
        let timer = setInterval(() => {
          ++this.index;
          this.isStopArr.push(true);
          if (this.index >= this.membersListLen) {
            clearInterval(timer);
          }
        }, 1000);
      },500)
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
.bg {
  width: 1280px;
  height: 704px;
  position: relative;
  background: url(../assets/sources/bg.png);
}
.roll-item {
  /* width: 100px; */
  display: flex;
  flex-direction: row;
  margin: 20px 50px;
}
.info-section {
  position: absolute;
  left: 200px;
  top: 400px;
  width: 856px;
}

</style>
