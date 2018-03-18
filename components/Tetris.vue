<template>
  <div class="Tetris">
    <h3>俄罗斯方块</h3>
    <div class="game" ref="game"></div>
    <div class="others">
        <div class="next" ref="next"></div>
        <div class="info">
            <div>下一个方块</div>
        </div>
    </div>
  </div>
</template>
<script>
import Game from '~/util/TetrisData.js';
export default {
  data(){
    return{
      game:new Game(),
      timer:null,
      INTERVAL:400,
    }
  },

  mounted(){
    this.game.init({
      gameDiv:this.$refs.game,
      nextDiv:this.$refs.next
    },this.generateType(),this.generateDir());
    this.bindKeyEvent();
    this.game.performNext(this.generateType(),this.generateDir());
    this.timer = setInterval(this.move,this.INTERVAL);
  },

  methods:{
    bindKeyEvent(){
      document.onkeydown = (e)=>{
        e.preventDefault();
        if(e.keyCode===38){
          //up
          this.game.rotate();
        }else if(e.keyCode===39){
          //right
          this.game.right();
        }else if(e.keyCode===40){
          //down
          this.game.down();
        }else if(e.keyCode===37){
          //left
          this.game.left();
        }else if(e.keyCode===32){
          //space
          this.game.fall();
        }
      }
    },
    move(){
      if(!this.game.down()){
        this.game.fixed();
        this.game.checkClear();
        let gameOver = this.game.checkGameOver();
        if(gameOver){
          this.stop();
        }else{
          this.game.performNext(this.generateType(),this.generateDir());
        }
      }
    },
    generateType(){
      return Math.ceil(Math.random()*7)-1;
    },
    generateDir(){
      return Math.ceil(Math.random()*4)-1;
    },
    stop(){
      if(this.timer){
        clearInterval(this.timer);
        this.timer = null;
      }
      document.onkeydown = null;
    }
  }
}
</script>

<style lang="less">
@import "~assets/css/var.less";
.Tetris {
    position: relative;
    width: 335px;
    height: 500px;
    margin: 0 auto;
  h3 {
      text-align: center;
      margin-bottom: 10px;
      position: relative;
      top: 15px;
  }
    ul {
      line-height: 20px;
      position: absolute;
      top: 470px;
  }

  .others {
      position: absolute;
      top: 60px;
      left: 220px;
  }


  .next {
      width: 82px;
      height: 82px;
      background-color: #f2faff;
      position: relative;
      /* top: 20px;
      left: 260px;  */
      border: 1px solid blueviolet;
  }

  .info div {
      margin-top: 5px;
  }

  .gameOver {
      margin-top: 6px;
      color: red;
      font-size: 16px;
      line-height: 20px;
  }

  .game {
      width: 202px;
      height: 402px;
      background-color: #f2faff;
      border-left: 1px solid blueviolet;
      border-right: 1px solid blueviolet;
      border-bottom: 1px solid blueviolet;
      position: absolute;
      top: 60px;
      left: 0;
  }
  .none,.current,.done {
        width: 20px;
        height: 20px;
        position: absolute;
        box-sizing: border-box;
    }

    .none {
        background-color: #f2faff;
    }

    .current {
        background-color: pink;
        border: 1px solid red;
    }

    .done {
        background-color: gray;
        border: 1px solid black;
    }
}
</style>