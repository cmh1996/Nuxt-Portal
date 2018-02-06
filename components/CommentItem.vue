<template>
  <li class="CommentItem">
    <div class="left">
      <img :src="img" alt="head"/>
    </div>
    <div class="right">
      <div class="info">
        <span>{{name}}</span>
        <span class="tips">{{tips}}</span>
      </div>
      <p class="content">
        {{content}}
      </p>
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
    name:{
      type:String,
      default:''
    },
    tips:{
      type:String,
      default:''
    },
    content:{
      type:String,
      default:''
    }
  },
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.CommentItem{
  width: 100%;
  overflow: hidden;
  position: relative;
  .left{
    display: inline-block;
    width: 10%;
    text-align: center;
    padding-top: 18px;
    position: absolute;
    top: 0;
    left: 0;
    img{
      width: 38px;
      height: 38px;
      border-radius: 50%;
    }
  }
  .right{
    width: 90%;
    display: inline-block;
    padding: 18px 0;
    border-bottom: 1px solid @borderColor;
    top: 0;
    float: right;
    .info{
      font-size: 15px;
      margin-bottom: 10px;
      span{
        color:@fontDeepColor;
        font-weight: 600;
      }
      .tips{
        display: inline-block;
        margin-left: 10px;
        color:@fontDefaultColor;
        font-weight: 500;
      }
    }
    .content{
      font-size: 15px;
      line-height: 23px;
    }
  }
}
</style>