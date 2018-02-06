<template>
  <li class="CharacterItem">
    <img class="characterImg" :src="img" alt="img"/>
    <div class="characterWrapper">
      <span class="characterTitle">{{title}}</span>
      <p class="characterDesc">{{desc}}</p>
      <slot name="characterElse"></slot>
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
    desc:{
      type:String,
      default:''
    }
  },
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.CharacterItem{
  width: 100%;
  padding: 50px 0;
  padding-bottom: 20px;
  position: relative;
  .characterImg{
    display: block;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    position: absolute;
    left: 50%;
    margin-left: -35px;
    top: 16px;
  }
  .characterWrapper{
    border: 1px solid @borderColor;
    padding: 25px;
    padding-top: 50px;
    text-align: center;
    color:@fontDeepColor;
    .characterTitle{
      font-size: 22px;
    }
    .characterDesc{
      margin-top: 10px;
      text-align: left;
      font-size: 15px;
      line-height: 24px;
      word-break:break-all;
    }
  }
}
</style>