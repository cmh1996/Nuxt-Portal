<template>
  <li class="NewsItem">
    <a :href="link">
      <img class="leftImg" :src="img" alt="img"/>
      <div class="rightContent">
        <h3 class="rightContentTitle">{{title}}</h3>
        <p class="rightContentDesc ellipsis-three">{{desc}}</p>
        <div class="rightContentTips">
          <slot name="bottomTips"></slot>
        </div>
      </div>
    </a>
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
    title:{
      type:String,
      default:''
    },
    desc:{
      type:String,
      default:''
    }
  },
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.NewsItem{
  width:750px;
  height: 190px;
  border-bottom: 1px solid @borderColor;
  background-color: white;
  padding: 20px 0;
  &:hover{
    background-color:rgb(246, 246, 246);
  }
  .leftImg{
    display: inline-block;
    width: 242px;
    height: 150px;
  }
  .rightContent{
    display: inline-block;
    margin-left: 20px;
    width: 488px;
    height: 150px;
    overflow: hidden;
    position: relative;
    .rightContentTitle{
      font-size: 22px;
      line-height: 26px;
      &:hover{
        color:@mainColor;
      }
    }
    .rightContentDesc{
      margin-top: 10px;
      line-height: 20px;
      font-size: 14px;
      color:@fontDefaultColor;
    }
    .rightContentTips{
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}
</style>
