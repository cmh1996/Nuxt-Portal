<template>
  <div class="Sudoku">
    <div class="panel">
      <div :class="['row',{'boldBottom':(iindex+1)%3===0}]" v-for="(iitem,iindex) in matrix" :key="iindex">
        <span :class="[{'boldRight':(jindex+1)%3===0}]" v-for="(jitem,jindex) in iitem" :key="jindex">{{jitem}}</span>
      </div>
    </div>

    <div class="dashboard">
      <div class="buttons">
        <button>检查</button>
        <button>重置</button>
        <button>清理</button>
        <button>重建</button>
      </div>
    </div>
  
    <div class="grid popup" v-show="showPopup"></div>

  </div>
</template>
<script>
export default {
  data(){
    return{
      showPopup:false,
      matrix:[],
    }
  },
  mounted(){
    //初始化矩阵
    const a = this.makeMatrix();
    this.matrix = a;
  },
  methods:{
    //新建一行
    makeRow(v=0){
      const a = new Array(9);
      a.fill(v);
      return a;
    },

    //新建九宫矩阵
    makeMatrix(v=0){
      return Array.from({length:9},()=>this.makeRow(v));
    },

    //洗牌算法
    shuffle(array){
      const endIndex = array.length-2;
      for(let i=0;i<=endIndex;i++){
        const j = i+Math.floor(Math.random()*(array.length-i));
        [array[i],array[j]] = [array[j],array[i]];
      }
      return array;
    },

    //生成数独
    generate(){
      for(let n=1;n<=9;n++){
        this.fillNumber(n);
      }
    },

    //从1-9填每一个数字
    fillNumber(n){
      this.fillRow(n,0);
    },

    //每一行每一行地填
    fillRow(n,rowIndex){
      //如果已经递归完第9行了，说明都成功了
      if(rowIndex>8){
        return true;
      }
      //遍历这一行的每个位置，看看哪里可以填
      const row = this.matrix[rowIndex];
      for(let i=0;i<9;i++){
        const colIndex = i;
        //如果这个位置已经有值或者检查过不能填，跳过
        if(row[colIndex] || !this.checkFillable()){
          continue;
        }
        row[colIndex] = n;
        if(!this.fillRow(n,rowIndex+1)){
          row[colIndex] = 0;
          continue;
        }
        return true;
      }
      return false;
    },

    //检查这个位置是否可以填n
    checkFillable(){
      return true;
    },


  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.Sudoku{
  width: 450px;
  height: 500px;
  user-select: none;
  background: #eeeeee;
  margin: 10px auto 0;
  position: relative;

  .panel{
    width: 400px;
    left: 50%;
    top: 50px;
    margin-left: -200px;
    position: absolute;
    .row{
      width: 100%;
      span{
        display: inline-block;
        cursor: pointer;
        text-align: center;
        width: 11%;
        height: 38px;
        line-height: 38px;
        border: 1px solid #cccccc;
        border-right-width: 0;
        border-bottom-width: 0;
        background: white;
        font-weight: bold;
        &:first-child{
          border-left-width:2px;
        }
        &:last-child{
          border-right-width:2px;
        }
        &.boldRight{
          border-right-width:2px;
        }
      }
      &:first-child{
        >span{
          border-top-width:2px;
        }
      }
      &:last-child{
        >span{
          border-bottom-width:2px;
        }
      }
      &.boldBottom{
        >span{
          border-bottom-width:2px;
        }
      }
    }
  }


  .dashboard{
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 14px 0;
    background-color: @thirdColor;
    height: 42px;
    .buttons{
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      button{
        float: left;
        width: 25%;
        height: 42px;
        font-size: 14px;
        color: white;
        border: 1px solid #cccccc;
        background: transparent;
        border-right-width: 0;
        cursor: pointer;
      }
    }
  }
}
</style>