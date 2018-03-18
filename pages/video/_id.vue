<template>
  <div class="VideoDetail">
    <div class="leftContainer">
      <ArsVideo
        img="https://dslb.cdn.krcom.cn/stream/loXsmV7wQjxrijb2KRVsl3H38RLRuw69BvPtmA___32768.jpg"
        videoSrc="https://o6yh618n9.qnssl.com/YZfB5tsi_6322701151.mp4"
        initWidth="800px"
        :danmakuList="danmakuList"
        :showDanmaku="showDanmaku"
        @getCurTime="getCurVideoTime"
      />
      <div class="postBox">
        <span>弹幕</span>
        <ArsSwitch @changeState="toggleDanmaku"/>
        <input ref="danmakuInput" type="text" placeholder="请输入弹幕&评论~" />
        <button @click="sendDanmaku">发送</button>
      </div>
      <div class="videoInfo">
        <h3>{{curVideo.title}}</h3>
        <div>
          <span>{{curVideo.pv+'次观看'}}</span>
          <span><i class="iconfont icon-fabulous"/>{{curVideo.likeNum}}</span>
        </div>
      </div>
      <ul class="commentList">
        <CommentItem
          v-for="(item,index) in comments"
          :key="'comment'+item.id"
          :img="item.headimg"
          :name="item.name"
          :tips="item.time"
          :content="item.content"
        />
      </ul>
    </div>
    <div class="rightContainer">
      <h3>接下来播放</h3>
      <ul class="playList">
        <SmallNewsItem 
          v-for="(item,index) in videoList" 
          :key="'video'+item.id"
          :link="'/video/'+item.id"
          :img="item.coverImg"
          :text="item.title"
          :tips="item.author"
        >
          <span class="imgTips" slot="imgTips">
            {{item.duration}}
          </span>
        </SmallNewsItem>
      </ul>
    </div>
  </div>
</template>

<script>
import {clientAxios as axios} from '~/plugins/axios';
import ArsVideo from '~/components/ArsVideo.vue';
import SmallNewsItem from '~/components/SmallNewsItem.vue';
import CommentItem from '~/components/CommentItem.vue';
import ArsSwitch from '~/components/ArsSwitch.vue';

export default {
  layout: 'noFooter',
  head () {
    return {
      title: '视频详情'
    }
  },

  components:{
    ArsVideo,
    SmallNewsItem,
    CommentItem,
    ArsSwitch
  },

  data(){
    return{
      showDanmaku:true,
      curVideoTime:0,
      selfDanmakuCount:0,
      danmakuList:[
        {
          id:1,
          content:'hello world',
          time:1
        },{
          id:2,
          content:'222222222222',
          time:0
        },{
          id:3,
          content:'333333333333d',
          time:3
        },{
          id:4,
          content:'4444444444444',
          time:3
        },{
          id:5,
          content:'555555555555',
          time:5
        },{
          id:6,
          content:'he66666666666orld',
          time:5
        },{
          id:7,
          content:'h77777777777',
          time:5
        },{
          id:8,
          content:'88888887',
          time:6
        },{
          id:9,
          content:'88sd888887',
          time:7
        },{
          id:10,
          content:'8888sd8887',
          time:7
        },{
          id:11,
          content:'88888sd887',
          time:8
        },{
          id:12,
          content:'888ddddddddddddddddddddddddd88887',
          time:8
        },{
          id:13,
          content:'撒旦是觉得你',
          time:12
        },{
          id:14,
          content:'阿斯顿vv人',
          time:15
        }
      ],
      comments:[
        {
          id:1,
          name:'此路不通',
          headimg:'http://tvax4.sinaimg.cn/crop.0.0.480.480.180/768c39d5ly8fjje1d0teej20dc0dcq35.jpg',
          time:'11-12',
          content:'沙巴网红美食店大揭秘，中国妹子被坑到泪哭干沙巴网红美食店大揭秘，中国妹子被坑到泪哭干沙巴网红美食店大揭秘，中国妹子被坑到泪哭干沙巴网红美食店大揭秘，中国妹子被坑到泪哭干沙巴网红美食店大揭秘，中国妹子被坑到泪哭干沙巴网红美食店大揭秘，中国妹子被坑到泪哭干'
        },{
          id:2,
          name:'此路不通',
          headimg:'http://tvax4.sinaimg.cn/crop.0.0.480.480.180/768c39d5ly8fjje1d0teej20dc0dcq35.jpg',
          time:'11-12',
          content:'沙巴网红'
        }
      ],
      curVideo:{
        id:4,
        coverImg:'https://dslb.cdn.krcom.cn/stream/loXsmV7wQjxrijb2KRVsl3H38RLRuw69BvPtmA___32768.jpg',
        duration:'02:21',
        title:'【足球时刻】C罗的2018年逆天表现集锦！',
        author:'足球世界',
        pv:20,
        likeNum:12,
      },
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
          coverImg:'http://wx3.sinaimg.cn/crop.0.0.1280.720.360/6e9d1c2fly1fp5k9c67mtj20zk0k048b.jpg',
          duration:'18:14',
          title:'史上最黑漫威超级英雄片观影指南​​​​',
          author:'电影幕后故事',
          pv:10
        },{
          id:3,
          coverImg:'http://wx3.sinaimg.cn/crop.0.0.1920.1080.360/006SGWFnly1fpchgtwmdlj31hc0u0qh7.jpg',
          duration:'13:36',
          title:'青年演员陈星旭：不喜欢“童星”标签，不愿套路观众！',
          author:'镜像娱乐观察',
          pv:0
        },{
          id:4,
          coverImg:'https://dslb.cdn.krcom.cn/stream/loXsmV7wQjxrijb2KRVsl3H38RLRuw69BvPtmA___32768.jpg',
          duration:'02:21',
          title:'【足球时刻】C罗的2018年逆天表现集锦！',
          author:'足球世界',
          pv:20
        },{
          id:5,
          coverImg:'https://wx2.sinaimg.cn/crop.0.6.1920.1067/a9d8cdd5gy1flm4bg1bwzj21hc0u0x6p.jpg',
          duration:'13:14',
          title:'旅行囧记S01E012-沙巴网红美食店大揭秘，中国妹子被坑到泪哭干',
          author:'旅行囧记00',
          pv:0
        },{
          id:6,
          coverImg:'http://wx3.sinaimg.cn/crop.0.0.1280.720.360/6e9d1c2fly1fp5k9c67mtj20zk0k048b.jpg',
          duration:'18:14',
          title:'史上最黑漫威超级英雄片观影指南​​​​',
          author:'电影幕后故事',
          pv:10
        },{
          id:7,
          coverImg:'http://wx3.sinaimg.cn/crop.0.0.1920.1080.360/006SGWFnly1fpchgtwmdlj31hc0u0qh7.jpg',
          duration:'13:36',
          title:'青年演员陈星旭：不喜欢“童星”标签，不愿套路观众！',
          author:'镜像娱乐观察',
          pv:0
        },{
          id:8,
          coverImg:'https://dslb.cdn.krcom.cn/stream/loXsmV7wQjxrijb2KRVsl3H38RLRuw69BvPtmA___32768.jpg',
          duration:'02:21',
          title:'【足球时刻】C罗的2018年逆天表现集锦！',
          author:'足球世界',
          pv:20
        }
      ]
    }
  },

  methods:{
    toggleDanmaku(state){
      if(state===1){
        this.showDanmaku = true;
      }else{
        this.showDanmaku = false;
      }
    },

    sendDanmaku(){
      const val = this.$refs.danmakuInput.value;
      if(val==='' || val.trim().length===0){
        alert('弹幕不能为空哦~');
      }else{
        this.selfDanmakuCount = this.selfDanmakuCount-1;
        this.danmakuList.push({
          id:this.selfDanmakuCount,
          content:val,
          time:this.curVideoTime+1
        })
        this.$refs.danmakuInput.value = '';
      }
    },

    getCurVideoTime(time){
      this.curVideoTime = time;
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.VideoDetail{
  .leftContainer{
    .ArsVideo{
      z-index: 100;
    }
    .postBox{
      width: 100%;
      height: 50px;
      line-height: 50px;
      padding: 0 20px;
      overflow: hidden;
      border:2px solid @borderColor;
      border-top: none;
      *{
        display: inline-block;
      }
      span{
        color:@fontDefaultColor;
      }
      .ArsSwitch{
        margin-left: 10px;
        position: relative;
        top: 6px;
      }
      input{
        width: 560px;
        font-size: 16px;
        margin-left: 20px;
        border:none;
        padding: 5px;
        border-bottom: 2px solid @secondColor;
      }
      button{
        width: 60px;
        height: 25px;
        background-color: transparent;
        color:@mainColor;
        border:1px solid @secondColor;
        border-radius: 20px;
        cursor: pointer;
        margin-left: 10px;
      }
    }
    .videoInfo{
      margin-top: 30px;
      h3{
        font-size: 23px;
      }
      div{
        margin-top: 25px;
        span{
          color:@fontDefaultColor;
          margin-right: 20px;
          i{
            font-size: 20px;
            margin-left: 10px;
            cursor: pointer;
            position: relative;
            top: 2px;
          }
        }
      }
    }
    .commentList{
      width: 100%;
      margin-top: 30px;
    }
  }
  .rightContainer{
    .SmallNewsItem{
      margin-top: 20px;
      .imgTips{
        display: block;
        position: absolute;
        bottom: 5px;
        right: 5px;
        background-color: rgba(0, 0, 0, 0.8);
        color:white;
        font-size: 10px;
        height: 14px;
        line-height: 14px;
        padding: 0 4px;
      }
    }
  }
}
</style>