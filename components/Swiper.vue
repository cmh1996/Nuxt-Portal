<template>
  <div class="Swiper" @mouseover="stopAnimate" @mouseout="continueAnimate">
    <div class="swiperBox">
      <ul class="swiperList" :style="{
        width:`${imgList.length}00%`,
        transform:`translate3d(-${curIndex/imgList.length*100}%,0,0)`
      }">
        <li class="swiperItem" v-for="(item,index) in imgList" :key="'banner'+index" :style="{width:`${1/imgList.length*100}%`}">
          <a :href="item.link">
            <div class="bannerImg" :style="{backgroundImage:`url(${item.img})`}"></div>
          </a>
          <div class="bannerText">
            {{item.text}}
          </div>
        </li>
      </ul>
    </div>
    <div class="lightBox">
      <span
        @click="selectIndex(index)"
        :class="{selected:curIndex===index}" 
        v-for="(item,index) in imgList.length" 
        :style="{width:`${1/imgList.length*100}%`}"
      />
    </div>
    <div class="arrow prevArrow" @click="prevHandle">
      <i class="iconfont icon-return"/>
    </div>
    <div class="arrow nextArrow" @click="nextHandle">
      <i class="iconfont icon-enter"/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgList:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      curIndex:0,
      timer:null
    }
  },
  mounted(){
    this.continueAnimate();
  },
  beforeDestroy(){
    this.stopAnimate();
  },
  methods:{
    selectIndex(index){
      this.curIndex = index;
    },

    prevHandle(){
      //已经是第一张了
      if(this.curIndex===0){
        this.curIndex = this.imgList.length-1
      }else{
        this.curIndex = this.curIndex-1;
      }
    },

    nextHandle(){
      //已经是最后一张了
      if(this.curIndex===this.imgList.length-1){
        this.curIndex = 0
      }else{
        this.curIndex = this.curIndex+1;
      }
    },

    stopAnimate(){
      clearInterval(this.timer);
    },

    continueAnimate(){
      this.timer = setInterval(()=>{
        if(this.curIndex===this.imgList.length-1){
          this.curIndex = 0
        }else{
          this.curIndex = this.curIndex+1;
        }
      },5000)
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.Swiper{
  width: 100%;
  height: 282px;
  position: relative;
  border-radius: 6px;
  overflow: hidden;
  .swiperBox{
    width: 100%;
    height: 274px;
    overflow: hidden;
    .swiperList{
      height: 100%;
      transition:transform 0.3s;
      .swiperItem{
        position: relative;
        height: 100%;
        float: left;
        .bannerImg{
          width: 100%;
          height: 100%;
          background-repeat: no-repeat;
          background-size: 100% 150%;
          transition:transform 0.5s;
          &:hover{
            transform:scale(1.1,1.1)
          }
        }
        .bannerText{
          width: 100%;
          position: absolute;
          bottom: 0;
          left: 0;
          height: 48px;
          background-color: rgba(0, 0, 0, 0.5);
          color:white;
          text-align: center;
          line-height: 48px;
          font-size: 18px;
        }
      }
    }
  }
  .lightBox{
    width: 100%;
    height: 6px;
    font-size: 0;
    span{
      display: inline-block;
      height: 100%;
      background-color: black;
      cursor: pointer;
      transition:background-color 0.2s;
      &:hover{
        background-color: @secondColor;
      }
    }
    .selected{
      background-color: @secondColor;
    }
  }
  .arrow{
    position: absolute;
    top: 50%;
    margin-top: -25px;
    width: 50px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    cursor: pointer;
    i{
      color:white;
      font-size: 40px;
      font-weight: bold;
    }
  }
  .prevArrow{
    left: 0;
  }
  .nextArrow{
    right: 0;
  }
}
</style>
