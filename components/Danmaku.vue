<template>
  <div :style="{width:width+'px',height:height+'px'}" class="Danmaku">
    <div 
    ref="danmakuItem"
    @transitionend="animateEndHandle(item.id)"
    @webkitTransitionEnd="animateEndHandle(item.id)"
    :style="{
      width:item.width+'px',
      left:'100%',
      top:item.top,
      transform:`translate3d(${item.transX}px,0,0)`,
      transition: `transform ${item.transTime}s linear`,
    }" 
    class="danmakuItem" 
    v-for="(item,index) in activeArr" 
    :key="'danmaku'+item.id">
      {{item.content}}
    </div>
  </div>
</template>
<script>
import {shuffle} from '~/util/util';
export default {
  props: {
    danmakuList:{
      type:Array,
      default:[]
    },
    width:{
      type:Number,
      default:0
    },
    height:{
      type:Number,
      default:0
    },
    curTime:{
      type:Number,
      default:-1
    },
    isPlaying:{
      type:Boolean,
      default:false
    },
    clear:{
      type:Boolean,
      default:false
    }
  },

  data(){
    return{
      activeArr:[],
      hasPaused:false,
      topArr:['0%','7%','14%','21%','28%','35%','42%','49%','56%','63%','70%','77%','84%']
    }
  },

  mounted(){
    this.checkTime(this.curTime);
  },

  methods:{
    checkTime(time){
      if(this.hasPaused){
        return;
      }
      this.danmakuList.map((item,index)=>{
        const itemTime = item.time;
        //发射弹幕
        if(itemTime===time){
          item.transTime = 5;
          item.top = this.checkTop();
          this.activeArr.push(item);

          //动态设置translateX,它才会动
          this.activeArr.map((activeItem,index)=>{
            if(activeItem===item){
              setTimeout(()=>{
                const w = parseFloat(document.defaultView.getComputedStyle(this.$refs.danmakuItem[index], null).width);
                this.activeArr.splice(index, 1, Object.assign({},item,{
                  width:w,
                  rate:(this.width+w)/5,
                  transX:-(this.width+w)
                }))
              },0);
            }
          })
        }
      })
    },

    animateEndHandle(id){
      //做完动画后，移除DOM元素
      if(!this.hasPaused){
        this.activeArr.map((item,index)=>{
          if(item.id===id){
            this.activeArr.splice(index,1);
          }
        })
      }
    },

    checkTop(){
      let top = '';
      let existTop = [];
      this.activeArr.map((item,index)=>{
        if(item.top){
          existTop.push(item.top);
        }
      });
      
      let temArr = this.topArr.slice();
      let arr = shuffle(temArr);

      for(let i=0;i<arr.length;i++){
        //已经存在
        if(existTop.includes(arr[i])){
          //已经遍历到了最后一个，但还是被占用着，说明每一个top都有弹幕在
          if(i===arr.length-1){
            top = arr[i];
            break;
          }
        }
        //还不存在，那就可以用
        else{
          top = arr[i];
          break;
        }
      }

      return top;
    }
  },

  watch:{
    width(newVal){
      this.activeArr.map((activeItem,index)=>{

        let beforePauseTrans = document.defaultView.getComputedStyle(this.$refs.danmakuItem[index], null).transform;
        let beforeT = parseFloat(beforePauseTrans.substring(7).split(',')[4]);

        activeItem.transX = -(newVal+activeItem.width);
        let transform = document.defaultView.getComputedStyle(this.$refs.danmakuItem[index], null).transform;
        let t = parseFloat(transform.substring(7).split(',')[4]);
        let time = Math.abs(activeItem.transX-t)/activeItem.rate;
        activeItem.transTime = time;

        if(this.hasPaused){
            setTimeout(()=>{
              this.$refs.danmakuItem[index].style.transform = `translate3d(${beforeT}px,0,0)`;
            },0)
        }

      })
    },
    curTime(newVal,oldVal){
      this.checkTime(newVal)
    },
    isPlaying(newVal){
      if(!newVal){
        //暂停动画
        this.hasPaused = true;
        this.$refs.danmakuItem.map((item,index)=>{
          let transform = document.defaultView.getComputedStyle(item, null).transform;
          let t = parseFloat(transform.substring(7).split(',')[4]);
          item.style.transform = `translate3d(${t}px,0,0)`;
        });
      }else{
        //继续动画
        this.hasPaused = false;
        this.$refs.danmakuItem.map((item,index)=>{
          let transform = document.defaultView.getComputedStyle(item, null).transform;
          let t = parseFloat(transform.substring(7).split(',')[4]);

          let time = Math.abs(this.activeArr[index].transX-t)/this.activeArr[index].rate;

          item.style.transform = `translate3d(${this.activeArr[index].transX}px,0,0)`;
          item.style.transition = `transform ${time}s linear`;
        })
      }
    },
    clear(newVal){
      if(newVal){
        this.activeArr = [];
      }
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.Danmaku{
  pointer-events:none;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 100;
  .danmakuItem{
    user-select: none;
    position: absolute;
    display: inline-block;
    white-space: pre;
    pointer-events: none;
    font-size: 23px;
    color: rgb(255, 255, 255);
    font-weight: bold;
    opacity: 1;
    text-shadow: rgb(0, 0, 0) 1px 0px 1px, rgb(0, 0, 0) 0px 1px 1px, rgb(0, 0, 0) 0px -1px 1px, rgb(0, 0, 0) -1px 0px 1px;
    transform:translate3d(0,0,0);
  }
}
</style>