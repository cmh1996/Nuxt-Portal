<template>
  <div 
    :class="[{theater:isTheater},'ArsVideo']"
    ref="arsVideo"
    @mouseover="toggleControlBox(true)"
    @mouseout="toggleControlBox(false)" 
    :style="{width:width,height:height}"
   >
    <video 
      ref="video" 
      :src='videoSrc' 
      autoplay="autoplay" 
      :poster="img" 
      preload="auto"
      @playing="videoCanPlay"
      @timeupdate="videoPlaying"
      @click="videoClickHandle"
    />
    <Danmaku 
      :width="parseFloat(width)" 
      :height="(parseFloat(height)-60)"  
      :danmakuList="danmakuList"
      :curTime="currentTime"
      :isPlaying="isPlaying"
      :clear="clearDanmaku"
      v-show="showDanmaku"
    />
    <div class="controlBox" v-show="showControl">
      <div 
        ref="progressBar" 
        class="progressBar" 
        @mousedown.stop.prevent="changeProgressByDrag"
        @click="changeProgress"
      >
        <div class="bufferBar" :style="{width:bufferPercent}"></div>
        <div class="playBar" :style="{width:playPercent}"></div>
      </div>
      <div class="controlBtnBox">
        <div class="left">
          <span class="playBtn">
            <i v-show="isPlaying" @click="playOrPause(false)" class="iconfont icon-bofangzanting03" />
            <i v-show="!isPlaying" @click="playOrPause(true)" class="iconfont icon-bofang" />
          </span>
          <span>
            <i class="iconfont icon-xiayishou" />
          </span>
          <span @click="toggleVolume">
            <i class="iconfont icon-close" />
          </span>
          <div class="volumeBar" ref="volumeBar" @mousedown.stop.prevent="changeVolumeByDrag" @click="changeVolume">
            <div class="curVolume" :style="{width:volumePercent}"></div>
          </div>
          <div class="time">{{curTime+'/'+wholeTime}}</div>
        </div>
        <div class="right">
          <span @click="showSpeedListHandle" class="speed">{{curSpeed+'x'}}</span>
          <span v-show="!isFullScreen" @click="toggleTheater"><i class="iconfont icon-enter" /></span>
          <span @click="toggleFullScreen"><i class="iconfont icon-close" /></span>
        </div>
      </div>
      <ul class="speedList" v-show="showSpeedList">
        <li @click="changeSpeed(2)">2x</li>
        <li @click="changeSpeed(1.5)">1.5x</li>
        <li @click="changeSpeed(1.25)">1.25x</li>
        <li @click="changeSpeed(1)">1x</li>
        <li @click="changeSpeed(0.75)">0.75x</li>
        <li @click="changeSpeed(0.5)">0.5x</li>
      </ul>
    </div>
  </div>
</template>
<script>
import {convertTime,fullScreen,exitFull} from '~/util/util';

import Danmaku from '~/components/Danmaku.vue';

export default {
  components:{
    Danmaku
  },
  props: {
    img:{
      type:String,
      default:''
    },
    videoSrc:{
      type:String,
      default:''
    },
    initWidth:{
      type:String,
      default:'854px'
    },
    initHeight:{
      type:String,
      default:'450px'
    },
    danmakuList:{
      type:Array,
      default:[]
    },
    showDanmaku:{
      type:Boolean,
      default:true
    }
  },

  data(){
    return{
      bufferPercent:'0%',
      playPercent:'0%',
      isPlaying:true,
      volumePercent:'100%',
      showControl:false,
      curTime:0,
      wholeTime:0,
      curSpeed:1,
      showSpeedList:false,
      isFullScreen:false,
      isTheater:false,
      width:this.initWidth,
      height:this.initHeight,
      currentTime:0,
      clearDanmaku:false,
    }
  },

  methods:{
    //控制controlBox显示与否
    toggleControlBox(bol){
      if(!this.isPlaying){
        this.showControl = true;
        return;
      }
      this.showControl = bol;
    },

    //播放暂停
    playOrPause(bol){
      this.isPlaying = bol;
    },

    videoCanPlay(){
      this.wholeTime = convertTime(this.$refs.video.duration);
    },

    videoPlaying(){
      this.clearDanmaku = false;
      this.currentTime = parseInt(this.$refs.video.currentTime);
      this.$emit('getCurTime',this.currentTime);
      this.curTime = convertTime(this.$refs.video.currentTime);
      this.playPercent = (this.$refs.video.currentTime/this.$refs.video.duration)*100+'%';
    },

    changeProgress(e){
      this.clearDanmaku = true;
      const elseX = this.$refs.progressBar.getBoundingClientRect().left;
      const progressPercent = Math.max((e.pageX-elseX),0)/(this.$refs.progressBar.getBoundingClientRect().right-elseX);
      this.$refs.video.currentTime = this.$refs.video.duration*progressPercent;
      this.playPercent = (this.$refs.video.currentTime/this.$refs.video.duration)*100+'%';
    },

    changeProgressByDrag(e){
      document.addEventListener('mousemove',this.changeProgress,false);
    },

    clearEvent(e){
      document.removeEventListener('mousemove',this.changeProgress,false);
      document.removeEventListener('mousemove',this.changeVolume,false)
    },

    changeVolume(e){
      const elseX = this.$refs.volumeBar.getBoundingClientRect().left;
      const progressPercent = Math.min(Math.max((e.pageX-elseX),0)/(this.$refs.volumeBar.getBoundingClientRect().right-elseX),1);
      this.$refs.video.volume = progressPercent;
      this.volumePercent = this.$refs.video.volume*100+'%';
    },

    changeVolumeByDrag(){
      document.addEventListener('mousemove',this.changeVolume,false)
    },

    toggleVolume(){
      const curVolume = this.$refs.video.volume;
      if(curVolume!==0){
        this.$refs.video.volume = 0;
        this.volumePercent = '0%';
      }else{
        this.$refs.video.volume = 0.5;
        this.volumePercent = '50%';
      }
    },

    changeSpeed(speed){
      this.showSpeedList = false;
      this.$refs.video.playbackRate = speed;
      this.curSpeed = speed;
    },

    showSpeedListHandle(){
      this.showSpeedList = !this.showSpeedList;
    },

    videoClickHandle(){
      this.showSpeedList = false;
      this.isPlaying = !this.isPlaying;
    },

    toggleFullScreen(){
      this.isTheater = false;
      this.isFullScreen = !this.isFullScreen;
      if(this.isFullScreen){
        fullScreen(this.$refs.arsVideo);
        this.width=window.screen.availWidth+'px';
        this.height=window.screen.availHeight+'px';
      }else{
        exitFull();
      }
    },

    fullScreenListener(){
      const dFullScreen = document.fullscreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement;
      if(!dFullScreen){
        this.width=this.initWidth;
        this.height=this.initHeight;
      }
    },

    toggleTheater(){
      this.isTheater = !this.isTheater;
      if(this.isTheater){
        this.width=window.innerWidth+'px';
        this.height=(window.innerHeight-60)+'px';
      }else{
        this.width=this.initWidth;
        this.height=this.initHeight;
      }
    },
  },

  mounted(){
    document.addEventListener("mouseup", this.clearEvent, false);
    document.addEventListener("fullscreenchange", this.fullScreenListener, false);
    document.addEventListener("mozfullscreenchange", this.fullScreenListener, false);
    document.addEventListener("webkitfullscreenchange", this.fullScreenListener, false);
    document.addEventListener("msfullscreenchange", this.fullScreenListener, false);
  },

  beforeDestroy(){
    document.removeEventListener("mouseup", this.clearEvent, false);
    document.removeEventListener("fullscreenchange", this.fullScreenListener, false);
    document.removeEventListener("mozfullscreenchange", this.fullScreenListener, false);
    document.removeEventListener("webkitfullscreenchange", this.fullScreenListener, false);
    document.removeEventListener("msfullscreenchange", this.fullScreenListener, false);
  },

  watch:{
    isPlaying(newVal,oldVal){
      if(newVal){
        this.$refs.video.play()
      }else{
        this.$refs.video.pause()
      }
    },
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.ArsVideo{
  position: relative;
  background-color: black;
  video{
    width: 100%;
    height: 100%;
  }
  .controlBox{
    width: 100%;
    height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 10;
    background: linear-gradient(top, rgba(0,0,0,0) 0%,rgba(0,0,0,0.5) 100%);
    padding: 0 15px;
    .progressBar{
      width: 100%;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.4);
      position: relative;
      cursor: pointer;
      .bufferBar{
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background-color: rgba(255, 255, 255, 0.7);
      }
      .playBar{
        position: absolute;
        height: 100%;
        left: 0;
        top: 0;
        background-color: @secondColor;
        &:after{
          content:'';
          position:absolute;
          right: -5px;
          top: -7.5px;
          width: 15px;
          height: 15px;
          background-color: @secondColor;
          border-radius: 50%;
        }
      }
    }
    .controlBtnBox{
      width: 100%;
      color:white;
      height: 45px;
      span{
        display: inline-block;
        width: 30px;
        margin: 0 12px 0 0;
        cursor: pointer;
        height: 36px;
        text-align: center;
        font-size: 17px;
        i{
          font-size: 18px;
          font-weight: 500;
        }
      }
      .left{
        float: left;
        height: 100%;
        line-height: 45px;
        span{
          i{
            font-size: 23px;
          }
        }
        .playBtn{
          i{
            font-size: 26px;
          }
        }
        .volumeBar{
          display: inline-block;
          width: 100px;
          height: 3px;
          background-color: rgba(0, 0, 0, 0.5);
          position: relative;
          bottom: 7px;
          cursor: pointer;
          .curVolume{
            position: absolute;
            top: 0;
            left: 0;
            background-color: white;
            height: 100%;
            &:after{
              content:'';
              position:absolute;
              right: -5px;
              top: -7.5px;
              width: 15px;
              height: 15px;
              background-color: white;
              border-radius: 50%;
            }
          }
        }
        .time{
          display: inline-block;
          margin-left: 20px;
          color:white;
          font-size: 13px;
          font-weight: 500;
          position: relative;
          bottom: 3px;
        }
      }
      .right{
        float: right;
        height: 100%;
        line-height: 45px;
        .speed{
          width: auto;
        }
      }
    }
    .speedList{
      bottom: 60px;
      right: 70px;
      position: absolute;
      width: 96px;
      background-color: rgba(0, 0, 0, 0.6);
      color:white;
      cursor: pointer;
      li{
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-align: center;
        &:hover{
          color:@secondColor;
        }
      }
      .selected{
        color:@secondColor;
      }
    }
  }
}
.theater{
  position: fixed;
  top: 60px;
  left: 0;
}
</style>