<template>
  <li class="CoverItem">
    <a :href="coverObj.link">
      <img :src="coverObj.img" alt="img"/>
      <div>
        <p>{{coverObj.text}}</p>
      </div>
    </a>
  </li>
</template>
<script>
export default {
  props: {
    coverObj:{
      type:Object,
    }
  },
}
</script>

<style scoped lang="less">
.CoverItem{
  width: 240px;
  height: 148px;
  position: relative;
  overflow: hidden;
  border-radius: 4px;
  a{
    position: relative;
    width: 100%;
    height: 100%;
    display: inline-block;
    img{
      width: 100%;
      height: 100%;
      transition:transform 0.5s;
      &:hover{
        transform:scale(1.1,1.1)
      }
    }
    div{
      position: absolute;
      left: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.7);
      width:100%;
      height: 55px;
      font-size: 14px;
      color:white;
      text-align: center;
      p{
        position: absolute;
        width: 210px;
        height: 34px;
        margin-left: -105px;
        left: 50%;
        margin-top: -17px;
        top: 50%;
        line-height: 17px;
        display: inline-block;
        vertical-align: middle;
        overflow:hidden; 
      }
    }
  }
}
</style>
