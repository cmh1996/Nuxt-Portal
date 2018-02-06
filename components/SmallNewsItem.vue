<template>
  <li class="SmallNewsItem">
    <a :href="link" v-if="img.length>0">
      <div class="imgBox">
        <img :src="img" alt="img" class="itemImg" />
        <slot name="imgTips"></slot>
      </div>
    </a>
    <div class="rightContent" :style="{width: img.length>0?'67%':'100%'}">
      <a :href="link"><p>{{text}}</p></a>
      <span>{{tips}}</span>
    </div>
  </li>
</template>
<script>
export default {
  props: {
    link:{
      type:String,
      default:''
    },
    img:{
      type:String,
      default:''
    },
    text:{
      type:String,
      default:''
    },
    tips:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.SmallNewsItem{
  width: 100%;
  height: 70px;
  .imgBox{
    position: relative;
    width: 33%;
    height: 100%;
    float: left;
    .itemImg{
      display: inline-block;
      width: 100%;
      height: 100%;
    }
  }
  .rightContent{
    display: inline-block;
    height: 100%;
    padding-left: 6px;
    overflow: hidden;
    float: right;
    text-align: left;
    position: relative;
    p{
      font-size: 15px;
      line-height: 20px;
      color:@fontDeepColor;
      overflow: hidden;
      text-overflow: ellipsis;
      display: box;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      &:hover{
        color:@secondColor;
      }
    }
    span{
      position: absolute;
      bottom: 0;
      left: 6px;
      display: block;
      font-size: 12px;
      color: @fontDefaultColor;
    }
  }
}
</style>