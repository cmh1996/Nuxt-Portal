<template>
  <div id="blur-box">
      <img id="blur-img" :src="img" alt="">
      <canvas ref="canvas" id="canvas">您的浏览器要更新啦!</canvas> 
      <div @click="reset" class="btn" id="reset">RESET</div>
      <div @click="show" class="btn" id="show">SHOW</div>
  </div>
</template>
<script>
export default {
  props: {
    img:{
      type:String,
      default:''
    }
  },

  computed:{
    cxt(){
      return this.$refs.canvas.getContext('2d')
    }
  },

  data(){
    return{
      CANVAS_WIDTH:800,
      CANVAS_HEIGHT:600,
      radius:50,
      image:new Image(),
      timer:null,
      clippingRegion:{
        x:400,
        y:200,
        r:50
      }
    }
  },

  mounted(){
    let canvas = this.$refs.canvas;
    canvas.width = this.CANVAS_WIDTH;
    canvas.height = this.CANVAS_HEIGHT;

    this.image.src = this.img;
    this.image.onload = this.initCanvas;
  },

  methods:{
    //初始化
    initCanvas(){
        this.clippingRegion = {x:Math.random()*(this.CANVAS_WIDTH-2*this.radius)+this.radius,
                             y:Math.random()*(this.CANVAS_HEIGHT-2*this.radius)+this.radius,
                             r:this.radius};
        this.draw(this.image,this.clippingRegion);
    },

    //画显示出来的图片
    draw(img,clippingRegion){
        this.cxt.clearRect(0,0,this.CANVAS_WIDTH,this.CANVAS_HEIGHT);
        this.cxt.save();
        this.setClippingRegion(this.clippingRegion);
        this.cxt.drawImage(img,0,0);
        this.cxt.restore();
    },

    //设置裁剪区域
    setClippingRegion(clippingRegion){
        this.cxt.beginPath();
        this.cxt.arc(clippingRegion.x,clippingRegion.y,clippingRegion.r,0,Math.PI*2,false);
        this.cxt.clip();
    },

    //随机显示位置
    reset(){
        this.initCanvas();
    },

    //显示全部图片
    show(){
        this.timer = setInterval(()=>{
                        this.$set(this.clippingRegion,'r',this.clippingRegion.r+20);
                        if(this.clippingRegion.r>1000){
                            clearInterval(this.timer);
                        }
                        this.draw(this.image,this.clippingRegion);
                    },30)
    }
  },

  beforeDestroyed(){
    this.timer = null;
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
#blur-box{
    width: 800px;
    height: 600px;
    margin: 0 auto;
    position: relative;
}
#blur-img{
    display: block;
    width: 800px;
    height: 600px;
    margin: 0 auto;
    filter: blur(20px);
    position: absolute;
    left: 0;
    top: 0;
    z-index: 0;
}
#canvas{
    display: block;
    margin: 0 auto;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 1;
}
.btn{
    display: block;
    position: absolute;
    z-index: 2;
    width: 100px;
    height: 30px;
    color: white;
    text-decoration: none;
    text-align: center;
    line-height: 30px;
    border-radius: 5px;
    cursor: pointer;
}
#reset{
    left: 200px;
    bottom: 20px;
    background: #058;
}
#reset:hover{
    background: #047;
}
#show{
    right: 200px;
    bottom: 20px;
    background: #085;
}
#show:hover{
    background: #074;
}
</style>