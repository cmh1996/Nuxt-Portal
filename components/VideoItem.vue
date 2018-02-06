<template>
  <li class="VideoItem">
    <a :href="link">
      <div class="imgBox">
        <img class="videoImg" :src="img" alt="videoImg"/>
        <span>{{duration}}</span>
      </div>
    </a>
    <div class="textBox">
      <a :href="link"><h3 class="videoTitle ellipsis-two">{{title}}</h3></a>
      <slot name="tips"></slot>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    img:{
      type:String,
      default:''
    },
    title:{
      type:String,
      default:''
    },
    duration:{
      type:String,
      default:''
    },
    link:{
      type:String,
      default:''
    }
  },
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.VideoItem{
  width: 196px;
  overflow: hidden;
  font-size: 13px;
  .imgBox{
    width: 100%;
    height: 120px;
    position: relative;
    overflow: hidden;
    .videoImg{
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
    span{
      position: absolute;
      padding: 0 5px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      display: block;
      right: 6px;
      bottom: 6px;
      background-color: rgba(0, 0, 0, 0.7);
      color:white;
      font-size: 10px;
    }
  }
  .textBox{
    margin-top: 10px;
    .videoTitle{
      color:@fontDeepColor;
      font-size: 14px;
      line-height: 20px;
      text-align: left;
      &:hover{
        color:@secondColor;
      }
    }
  }
}
</style>