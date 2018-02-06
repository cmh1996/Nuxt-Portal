<template>
  <div class="TagHeader">
    <span
    :style="{width:`${1/tagList.length*100}%`}"
    :class="{selected:curIndex===index}"
    @click="selectTag(index)"
    v-for="(item,index) in tagList" 
    :key="'tagHeader'+index">
      {{item}}
    </span>
  </div>
</template>
<script>
export default {
  props: {
    tagList:{
      type:Array,
      default:[]
    }
  },
  data(){
    return{
      curIndex:0
    }
  },
  methods:{
    selectTag(index){
      this.curIndex = index;
      this.$emit('curTagChange',index)
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.TagHeader{
  width: 100%;
  height: 50px;
  border-bottom: 1px solid @borderColor;
  span{
    height: 50px;
    line-height: 50px;
    text-align: center;
    display: inline-block;
    color: @fontDefaultColor;
    font-weight: bold;
    cursor: pointer;
  }
  .selected{
    color:black;
  }
}
</style>