<template>
  <div class="ArsSwitch" @click="switchState" :style="{background:curState===0?'#7d7d92':'#409eff'}">
    <div class="circle" :style="{left:curState===0?'1px':'28px'}"></div>
  </div>
</template>
<script>
export default {
  data(){
    return{
      //0是关，1是开
      curState:1
    }
  },
  methods:{
    switchState(){
      if(this.curState===0){
        this.curState=1;
      }else{
        this.curState=0
      }
      this.$emit('changeState',this.curState)
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.ArsSwitch{
  width: 50px;
  height: 23px;
  border-radius: 20px;
  position: relative;
  cursor: pointer;
  transition:background 0.3s;
  .circle{
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 1.2px;
    transition:left 0.3s;
  }
}
</style>