<template>
  <div class="game-bg">
    <div class="info-section">
      <div class="roll-item roll-item-5">
        <game-item :isStop='isStopArr[item]' v-for="(item,index) in tempList" :key="item.index"  class="item-5">{{isStopArr[item]}}</game-item>
      </div>
    </div>
    <div>
      <audio autoplay ref="bgMusic">
        <source src="../assets/sources/playgamebg.mp3" type="audio/mpeg">
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
      rankKey: [],
      isStop: false
    };
  },
  created:function(){
   
 
  },
  mounted: function() {
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
      this.tempList = [];
      this.isStopArr = [];
      this.index = -1;
      for (let i = 0; i < 10; i++) {
        this.tempList.push(i);
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
        let timer = setInterval(() => {
          ++this.index;
          this.isStopArr.push(true);
          if (this.index >= 10) {
            clearInterval(timer);
          }
        }, 1000);
    },
    changeCurrentKey: function() {
      if (len > 0) {
        return;
      } else {
        this.rankKey.pop();
      }
    }
  }
};
</script>

<style scoped>
.game-bg {
  width: 1280px;
  height: 704px;
  position: relative;
  background:url(../assets/sources/game5bg.jpg)
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
.roll-item-5{
  margin:35px 125px;
  width:775px;
  height:500px;
  display:block;
}
.item-5 {
  float:left;
  width: 130px;
  height: 142px;
}

</style>
