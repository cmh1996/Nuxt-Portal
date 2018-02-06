<template>
  <div class="Video clear">
    <ul class="leftList" ref="leftList">
      <li :class="[{'selected':curIndex===0}]" @click="switchChannel(0)">
        <i class="iconfont icon-close" />
        <span>推荐</span>
      </li>
      <li :class="[{'selected':curIndex===1}]" @click="switchChannel(1)">
        <i class="iconfont icon-close" />
        <span>收藏的节目</span>
      </li>
      <li :class="[{'selected':curIndex===2}]" @click="switchChannel(2)">
        <i class="iconfont icon-close" />
        <span>看过的节目</span>
      </li>
    </ul>
    <div class="rightContent">
      <div class="recommend" v-if="curIndex===0">
        <section class="channelItem">
          <SectionHeader :title="'时下流行'"/>
          <div class="btnBox">
            <div class="listBtn prevBtn" v-show="prevShow[0]" @click="prev(0)"><i class="iconfont icon-return" /></div>
            <div class="listBtn nextBtn" v-show="nextShow[0]" @click="next(0)"><i class="iconfont icon-enter" /></div>
          </div>
          <div class="videoListWrapper">
            <ul class="videoList" ref="hit">
              <VideoItem 
                v-for="(item,index) in videoList"
                :key="item.id"
                :img="item.coverImg"
                :duration="item.duration"
                :title="item.title"
                :link="'/video/'+item.id"
              >
                <div class="videoTips" slot="tips">
                  <p>{{item.author}}</p>
                  <p>{{item.pv+'次观看'}}</p>
                </div>
              </VideoItem>
            </ul>
          </div>
        </section>
        <section class="channelItem">
          <SectionHeader :title="'最新音乐视频'"/>
          <div class="btnBox">
            <div class="listBtn prevBtn" v-show="prevShow[1]" @click="prev(1)"><i class="iconfont icon-return" /></div>
            <div class="listBtn nextBtn" v-show="nextShow[1]" @click="next(1)"><i class="iconfont icon-enter" /></div>
          </div>
          <div class="videoListWrapper">
            <ul class="videoList" ref="song">
              <VideoItem 
                v-for="(item,index) in videoList"
                :key="item.id"
                :img="item.coverImg"
                :duration="item.duration"
                :title="item.title"
                :link="'/video/'+item.id"
              >
                <div class="videoTips" slot="tips">
                  <p>{{item.author}}</p>
                  <p>{{item.pv+'次观看'}}</p>
                </div>
              </VideoItem>
            </ul>
          </div>
        </section><section class="channelItem">
          <SectionHeader :title="'体育赛事'"/>
          <div class="btnBox">
            <div class="listBtn prevBtn" v-show="prevShow[2]" @click="prev(2)"><i class="iconfont icon-return" /></div>
            <div class="listBtn nextBtn" v-show="nextShow[2]" @click="next(2)"><i class="iconfont icon-enter" /></div>
          </div>
          <div class="videoListWrapper">
            <ul class="videoList" ref="sports">
              <VideoItem 
                v-for="(item,index) in videoList"
                :key="item.id"
                :img="item.coverImg"
                :duration="item.duration"
                :title="item.title"
                :link="'/video/'+item.id"
              >
                <div class="videoTips" slot="tips">
                  <p>{{item.author}}</p>
                  <p>{{item.pv+'次观看'}}</p>
                </div>
              </VideoItem>
            </ul>
          </div>
        </section>
      </div>
      <div class="collect userVideo" v-if="curIndex===1">
        <ul>
          <VideoItem 
            v-for="(item,index) in videoList"
            :key="item.id"
            :img="item.coverImg"
            :duration="item.duration"
            :title="item.title"
            :link="'/video/'+item.id"
          >
            <div class="videoTips" slot="tips">
              <p>{{item.author}}</p>
              <p>{{item.pv+'次观看'}}</p>
            </div>
          </VideoItem>
        </ul>
      </div>
      <div class="watched userVideo" v-if="curIndex===2">
        <ul>
          <VideoItem 
            v-for="(item,index) in videoList"
            :key="item.id"
            :img="item.coverImg"
            :duration="item.duration"
            :title="item.title"
            :link="'/video/'+item.id"
          >
            <div class="videoTips" slot="tips">
              <p>{{item.author}}</p>
              <p>{{item.pv+'次观看'}}</p>
            </div>
          </VideoItem>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SectionHeader from '~/components/SectionHeader.vue';
import VideoItem from '~/components/VideoItem.vue';

export default {
	layout: 'noFooter',
	scrollToTop: true,

  async asyncData ({ params, error }){
  },

	components: {
  	SectionHeader,
    VideoItem
	},

	data () {
  	return { 
      curIndex: 0,
      channelList:['hit','song','sports'],
      prevShow:[false,false,false],
      nextShow:[true,true,true],
      videoList:[
        {
          id:1,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记00',
          pv:0
        },{
          id:2,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记',
          pv:0
        },{
          id:3,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记',
          pv:0
        },{
          id:4,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记',
          pv:0
        },{
          id:5,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记',
          pv:0
        },{
          id:6,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记',
          pv:0
        },{
          id:7,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记',
          pv:0
        },{
          id:8,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记11',
          pv:0
        }
      ]
    }
	},

  mounted(){
    this.$refs.leftList.style.height = (window.innerHeight - 60)+'px';
  },

  methods:{
    switchChannel(index){
      this.curIndex = index;
    },
    prev(listIndex){
      this.$refs[this.channelList[listIndex]].style.left = 0;
      this.prevShow.splice(listIndex,1,false);
      this.nextShow.splice(listIndex,1,true);
    },
    next(listIndex){
      this.$refs[this.channelList[listIndex]].style.left = '-100%';
      this.prevShow.splice(listIndex,1,true);
      this.nextShow.splice(listIndex,1,false);
    },
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.Video{
  .leftList{
    width: 250px;
    float: left;
    background-color: #fafafa;
    position: fixed;
    top: 60px;
    li{
      width: 100%;
      height: 50px;
      line-height: 50px;
      cursor: pointer;
      i{
        font-size: 20px;
        margin-left: 20px;
      }
      span{
        font-size: 16px;
        margin-left: 20px;
      }
      &:hover{
        background-color: rgb(235, 235, 235)
      }
    }
    .selected{
      i{
        color:@mainColor;
      }
      span{
        color:@mainColor;
      }
    }
  }
  .rightContent{
    width: 870px;
    margin-left: 250px;
    position: relative;
    overflow: hidden;
    .VideoItem{
      float: left;
      margin-right: 5px;
      .videoTips{
        color:@fontDefaultColor;
        text-align: left;
        p{
          margin-top: 7px;
        }
      }
    }
    .recommend{
      .channelItem{
        width: 100%;
        text-align: center;
        border-bottom: 1px solid @borderColor;
        padding-bottom: 30px;
        position: relative;
        .SectionHeader{
          border: none;
        }
        .btnBox{
          .listBtn{
            width: 42px;
            height: 42px;
            line-height: 42px;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 1px 4px 5px #888888;
            position: absolute;
            top: 33%;
            background-color: white;
            z-index: 10;
            i{
              font-size: 20px;
            }
          }
          .prevBtn{
            left: 2%;
          }
          .nextBtn{
            right: 2%;
          }
        }
        .videoListWrapper{
          width: 92%;
          height: 210px;
          display: inline-block;
          overflow: hidden;
          position: relative;
          .videoList{
            width: 220%;
            position: absolute;
            left: 0;
            top: 0;
            transition:left 0.3s;
          }
        }
      }
    }
    .userVideo{
      padding: 33px;
      .VideoItem{
        margin-bottom: 30px;
      }
    }
  }
}
</style>