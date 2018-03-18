<template>
  <div class="Gobang">
    <canvas class="chess" @click="playHandle" ref="canvas" width="500px" height="500px"></canvas>
    <button class="restart" @click="restart">重新开始</button>
  </div>
</template>
<script>
import ChessPiece from '~/util/ChessPiece.js'
export default {
  data(){
    return{
      role:1,//黑1白2
      chessboard:[],
      gameover:false,
    }
  },

  computed:{
    ctx(){
      return this.$refs.canvas.getContext('2d');
    }
  },

  mounted(){
    this.initArray();
    this.drawLine();
  },

  methods:{
    //记录落子情况
    initArray(){
      for(let i=0;i<15;i++){
          this.chessboard[i] = [];
          for(let j=0;j<15;j++){
              this.chessboard[i][j] = 0;
          }
      }
    },

    //画棋盘
    drawLine(){
        this.ctx.save();
        this.ctx.beginPath();
        this.ctx.strokeStyle = "rgba(0,0,0,0.5)";
        for(let i=0;i<15;i++){
            this.ctx.moveTo(26,26+i*32);
            this.ctx.lineTo(474,26+i*32);
            this.ctx.stroke();
            this.ctx.moveTo(26+i*32,26);
            this.ctx.lineTo(26+i*32,474);
            this.ctx.stroke();
        }
        this.ctx.closePath();
        this.ctx.restore();
    },

    //下棋判断逻辑
    playHandle(e){
      const i = Math.floor(e.offsetX/32);
      const j = Math.floor(e.offsetY/32);
      //画棋子，占位置
      if(this.gameover===false){
          this.play(i,j);
      }
    },

    //下棋判断逻辑
    play(i,j){
        //棋格为空才能下棋
        if(this.chessboard[i][j]===0){
            let chesspiece = new ChessPiece(i,j,this.role,this.ctx);
            chesspiece.draw();

            if(this.role===1){
                this.chessboard[i][j]=1;//黑棋占领
            }else{
                this.chessboard[i][j]=2;//白棋占领
            }

            //判断胜负
            this.judgeWin(i,j,this.role);

            //换人
            this.role = this.role===1?2:1;
        }
    },

    judgeWin(x,y,role){
        let row=0,
            column=0,
            diagonal1=0,
            diagonal2=0;
        
        //横向判断
        for(let i=x;i<15;i++){
            if(this.chessboard[i][y]===this.role){
                row++;
            }else{
                break;
            }
        }
        for(let i=x-1;i>=0;i--){
            if(this.chessboard[i][y]===this.role){
                row++;
            }else{
                break;
            }
        }

        //纵向判断
        for(let i=y;i<15;i++){
            if(this.chessboard[x][i]===this.role){
                column++;
            }else{
                break;
            }
        }
        for(let i=y-1;i>=0;i--){
            if(this.chessboard[x][i]===this.role){
                column++;
            }else{
                break;
            }
        }

        //左上右下判断
        for(let i=x,j=y; i>=0&&j>=0; i--,j--){
            if(this.chessboard[i][j]===this.role){
                diagonal1++;
            }else{
                break;
            }
        }
        for(let i=x+1,j=y+1; i<15&&j<15; i++,j++){
            if(this.chessboard[i][j]===this.role){
                diagonal1++;
            }else{
                break;
            }
        }

        //左下右上判断
        for(let i=x,j=y; i>=0&&j<15; i--,j++){
            if(this.chessboard[i][j]===this.role){
                diagonal2++;
            }else{
                break;
            }
        }
        for(let i=x+1,j=y-1; i<15&&j>=0; i++,j--){
            if(this.chessboard[i][j]===this.role){
                diagonal2++;
            }else{
                break;
            }
        }


        let player = this.role===1?'执黑者':'执白者';

        if(row>=5 || column>=5 || diagonal1>=5 || diagonal2>=5){
            this.gameover = true;
            setTimeout(function(){
                alert(player+'赢了！');
            },200);
        }

    },

    restart(){
      this.gameover = false;
      this.initArray();

      this.ctx.clearRect(0,0,500,500);
      this.drawLine();
    }

  }
}
</script>

<style scoped lang="less">
.chess{
    background: #ffe6b5;
    margin: 20px auto;
    display: block;
    border: 1px solid rgba(0, 0, 0, 0.6);
}
.restart{
    display: block;
    margin: 0 auto;
    width: 100px;
    height: 30px;

}
</style>