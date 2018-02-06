<template>
  <div class="SectionHeader">
    <h4>{{title}}</h4>
  </div>
</template>
<script>
export default {
  props: {
    title:{
      type:String,
      default:''
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.SectionHeader{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  border-top: 2px solid @secondColor;
  border-bottom: 1px dashed @borderColor;
  font-size: 16px;
}
</style>