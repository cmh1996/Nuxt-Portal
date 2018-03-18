<template>
  <div class="game">
    <ul class="gameList" :style="{height:listHeight}">
      <p class="gameNum">我的游戏（{{gameList.length}}）</p>
      <li :class="[{active:curGameId===item.id},'gameItem']" v-for="(item,index) in gameList" :key="item.id" @click="selectGame(item.id)">
        <img class="gameLeft" :src="item.img" :alt="item.title" />
        <div class="gameRight">
          <h3>{{item.title}}</h3>
        </div>
      </li>
    </ul>
    <div class="gameArea">
      <Tetris v-if="curGameId===1" />
      <Gobang v-else-if="curGameId===2"/>
      <WriteGrid v-else-if="curGameId===3" />
      <BlurImage img="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521114709088&di=2b6dcb9a1ae354b2b9d2c938b331b48f&imgtype=0&src=http%3A%2F%2Fpic2.16pic.com%2F00%2F55%2F43%2F16pic_5543422_b.jpg" v-else-if="curGameId===4" />
    </div>
  </div>
</template>

<script>
import Sudoku from '~/components/Sudoku.vue';
import Tetris from '~/components/Tetris.vue';
import Gobang from '~/components/Gobang.vue';
import WriteGrid from '~/components/WriteGrid.vue';
import BlurImage from '~/components/BlurImage.vue';

export default {
	layout: 'noFooter',
	scrollToTop: true,
  head () {
    return {
      title: '游戏大厅'
    }
  },
	components: {
    Sudoku,
    WriteGrid,
    BlurImage,
    Gobang,
    Tetris
	},

  mounted(){
    this.listHeight = (window.innerHeight - 60)+'px';
  },

	data () {
    return{
      listHeight:'auto',
      curGameId:1,
      gameList:[
        /*{
          id:1,
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521101670785&di=afea217f36cdfb9626f29556d03a1dd6&imgtype=0&src=http%3A%2F%2Fwww.buhuiwan.com%2Fuploadfile%2F2015%2F0516%2F20150516045341196.png',
          title:'数独'
        },*/{
          id:1,
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521101707659&di=afce0ab68f33dc263ec15ad21e94feb7&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2F738b4710b912c8fca1d19e04f6039245d78821dc.jpg',
          title:'俄罗斯方块'
        },{
          id:2,
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521101753413&di=45267d91fee2e5d5f59d6d4f35908389&imgtype=0&src=http%3A%2F%2Fimg.25pp.com%2Fuploadfile%2Fyouxi%2Fimages%2F2015%2F0709%2F20150709025812104.jpg',
          title:'五子棋'
        },{
          id:3,
          img:'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=1813131362,2195985299&fm=27&gp=0.jpg',
          title:'写个毛笔字'
        },{
          id:4,
          img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1521104226610&di=9428f98dbd26bd2b58e4f59b43a99f21&imgtype=0&src=http%3A%2F%2Fpic.58pic.com%2F58pic%2F15%2F62%2F15%2F30Y58PICijn_1024.jpg',
          title:'擦亮图片'
        }
      ]
    }
	},

  methods:{
    selectGame(gameId){
      this.curGameId = gameId;
    }
  }

}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.game{
  .gameList{
    width: 250px;
    float: left;
    background-color: #ffffff;
    position: fixed;
    top: 60px;
    overflow-y: scroll;
    overflow-x: hidden;
    border-left: 1px solid @borderColor;
    border-right: 1px solid @borderColor;
    padding-left: 10px;
    .gameNum{
      font-size: 14px;
      height: 40px;
      line-height: 40px;
      user-select: none;
    }
    .gameItem{
      width: 96%;
      height: 100px;
      border: 1px solid @borderColor;
      cursor: pointer;
      box-shadow: 0 2px 2px @borderColor;
      margin-bottom: 8px;
      .gameLeft{
        width: 50%;
        height: 100%;
        display: inline-block;
        vertical-align: top;
      }
      .gameRight{
        display: inline-block;
        vertical-align: top;
        width: 50%;
        height: 100%;
        position: relative;
        h3{
          font-size: 15px;
          position: absolute;
          top: 16px;
          right: 10px;
        }
      }
      &:hover{
        border-width: 2px;
        border-color: @thirdColor;
      }
    }
    .active{
      border-width: 2px;
      border-color: @thirdColor;
    }
  }
  .gameArea{
    width: 870px;
    margin-left: 250px;
    position: relative;
    overflow: hidden;
  }
}
::-webkit-scrollbar{width: 10px;}
::-webkit-scrollbar-track{background-color:transparent;}
::-webkit-scrollbar-thumb{background-color:#D3D6DD;border-radius: 10px;}
</style>