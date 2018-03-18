<template>
  <div class="WriteGrid">
      <canvas @mousedown="mousedownHandle" @mouseup="mouseupHandle" @mouseout="mouseoutHandle" @mousemove="mousemoveHandle" ref="canvas" id="canvas"></canvas>
      <div id="controller">
          <div @click="clear" id="clear_btn" class="op_btn">清空</div>
          <div class="clearfix"></div>
      </div>
  </div>
</template>
<script>
export default {
  computed:{
    cxt(){
      return this.$refs.canvas.getContext('2d')
    }
  },

  data(){
    return{
      CANVAS_WIDTH:600,
      CANVAS_HEIGHT:600,
      isMouseDown:false,
      lastLoc:{x:0,y:0},
      lastTimeStamp:0,
      lastLineWidth:-1,
      maxLineWidth:30,
      minLineWidth:1,
      maxV:10,
      minV:0.1,
    }
  },

  mounted(){
    this.$refs.canvas.width = this.CANVAS_WIDTH;
    this.$refs.canvas.height = this.CANVAS_HEIGHT;

    this.drawGrid();
  },

  methods:{
    mousedownHandle(e){
        e.preventDefault();
        this.isMouseDown = true;
        this.lastLoc = this.windowToCanvas(e.clientX,e.clientY);
        this.lastTimeStamp = new Date().getTime();
    },
    mouseupHandle(e){
        e.preventDefault();
        this.isMouseDown = false;
    },
    mouseoutHandle(e){
        e.preventDefault();
        this.isMouseDown = false;
    },
    mousemoveHandle(e){
        e.preventDefault();
        if(this.isMouseDown){
            let curLoc = this.windowToCanvas(e.clientX,e.clientY);
            let curTimeStamp = new Date().getTime();

            let s = this.calcDistance(this.lastLoc,curLoc);//两点之间的距离
            let t = curTimeStamp - this.lastTimeStamp;//两点之间的时间

            //画
            let lineWidth = this.calcLineWidth(t,s); //根据时间和距离求速度，来得到linewidth

            this.cxt.beginPath();
            this.cxt.moveTo(this.lastLoc.x,this.lastLoc.y);
            this.cxt.lineTo(curLoc.x,curLoc.y);
            this.cxt.strokeStyle = 'black';
            this.cxt.lineWidth = lineWidth;
            this.cxt.lineCap = 'round';
            this.cxt.lineJoin = 'round';
            this.cxt.stroke();

            this.lastLoc = curLoc;
            this.lastTimeStamp = curTimeStamp;
            this.lastLineWidth = lineWidth;
        }
    },
    clear(e){
        this.cxt.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
        this.drawGrid();
    },
    calcLineWidth(t,s){
        let v = s/t;
        let resultLineWidth;
        if(v>=this.maxV){
            resultLineWidth = this.minLineWidth;
        }else if(v<=this.minV){
            resultLineWidth = this.maxLineWidth
        }else{
            resultLineWidth = this.maxLineWidth - (v-this.minV)/(this.maxV-this.minV)*(this.maxLineWidth-this.minLineWidth)
        }
        
        if(this.lastLineWidth === -1){
            return resultLineWidth;
        }
        return this.lastLineWidth*2/3 + resultLineWidth*1/3;
    },

    //计算两点之间的距离
    calcDistance(loc1,loc2){
        return Math.sqrt((loc1.x-loc2.x)*(loc1.x-loc2.x) + (loc1.y-loc2.y)*(loc1.y-loc2.y))
    },


    //转变为canvas内的坐标
    windowToCanvas(x,y){
        var bbox = this.$refs.canvas.getBoundingClientRect();
        return {x:Math.round(x-bbox.left),
                y:Math.round(y-bbox.top)};
    },

    drawGrid(){
        this.cxt.save();
        this.cxt.strokeStyle = 'rgb(230,11,9)';

        //画外层边框
        this.cxt.beginPath();
        this.cxt.moveTo(3,3);
        this.cxt.lineTo(this.CANVAS_WIDTH-3,3);
        this.cxt.lineTo(this.CANVAS_WIDTH-3,this.CANVAS_HEIGHT-3);
        this.cxt.lineTo(3,this.CANVAS_HEIGHT-3);
        this.cxt.closePath();
        this.cxt.lineWidth = 6;

        this.cxt.stroke();

        //画米字格
        this.cxt.beginPath();
        this.cxt.moveTo(0,0);
        this.cxt.lineTo(this.CANVAS_WIDTH,this.CANVAS_HEIGHT);

        this.cxt.moveTo(this.CANVAS_WIDTH,0);
        this.cxt.lineTo(0,this.CANVAS_HEIGHT);

        this.cxt.moveTo(this.CANVAS_WIDTH/2,0);
        this.cxt.lineTo(this.CANVAS_WIDTH/2,this.CANVAS_HEIGHT);

        this.cxt.moveTo(0,this.CANVAS_HEIGHT/2);
        this.cxt.lineTo(this.CANVAS_WIDTH,this.CANVAS_HEIGHT/2);

        this.cxt.lineWidth = 1;
        this.cxt.stroke();
        this.cxt.restore();
    },
  },

}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
#canvas{
    display: block;
    margin: 0 auto;
}
#controller{
    width: 600px;
    margin: 0 auto;
}
.op_btn{
    float: right;
    margin: 10px 0 0 10px;
    border: 2px solid #aaa;
    width: 80px;
    height: 40px;
    line-height: 40px;
    font-size: 20px;
    text-align: center;
    border-radius: 5px;
    cursor: pointer;
    background: white;
    font-weight: bold;
}
.op_btn:hover{
    background: #def;
}
.clearfix{
    clear: both;
}
</style>