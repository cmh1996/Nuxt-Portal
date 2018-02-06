<template>
  <div class="indexPage">
    <div class="leftContainer">
      <Swiper :imgList="bannerList"/>
      <ul class="coverSum">
        <CoverItem v-for="(item,index) in coverSumList" :key="item.link" :coverObj="item"/>
      </ul>
      <div class="newsListBox">
        <TagHeader :tagList="newsTag" @curTagChange="selectNewsType"/>
        <ul class="newsList">
          <NewsItem 
            v-for="(item,index) in newsList"
            :key="item.id"
            :link="'/news/'+item.id"
            :img="item.cover"
            :title="item.title"
            :desc="item.summary"
          >
            <div class="bottomTips" slot="bottomTips">
              <span>{{item.user?item.user.name+' / ':''}}</span>
              <span>{{item.created_at}}</span>
              <span class="lastTips">{{item.counters.comment+'评论 '+item.counters.like+'收藏'}}</span>
            </div>
          </NewsItem>
        </ul>
      </div>
    </div>
    <div class="rightContainer">
      <ul class="weekNews">
        <SectionHeader :title="'7×24h 快讯'"/>
        <SmallNewsItem 
          v-for="(item,index) in hotNewsList.slice(11,20)" 
          :key="'hot'+item.id"
          :link="'/news/'+item.id"
          :text="item.title"
          :tips="item.created_at.substring(5,10)"
        />
      </ul>
      <ul class="hotNews">
        <SectionHeader :title="'热门文章'"/>
        <CoverItem v-for="(item,index) in hotNewsList.slice(0,3)" :key="'hot'+item.id" :coverObj="{
          link:'/news/'+item.id,
          img:item.cover,
          text:item.title
        }"/>
        <SmallNewsItem 
          v-for="(item,index) in hotNewsList.slice(3,10)" 
          :key="'hot'+item.id"
          :link="'/news/'+item.id"
          :img="item.cover" 
          :text="item.title"
          :tips="item.created_at.substring(5,10)"
        />
      </ul>
      <ul class="characterSpeech">
        <SectionHeader :title="'今日言论'"/>
        <CharacterItem 
          v-for="(item,index) in characterSpeech" 
          :key="'speech'+item.id"
          :img="item.photo"
          :title="item.name"
          :desc="item.content"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import {clientAxios as axios} from '~/plugins/axios';

import Swiper from '~/components/Swiper.vue';
import CoverItem from '~/components/CoverItem.vue';
import TagHeader from '~/components/TagHeader.vue';
import NewsItem from '~/components/NewsItem.vue';
import CharacterItem from '~/components/CharacterItem.vue';
import SectionHeader from '~/components/SectionHeader.vue';
import SmallNewsItem from '~/components/SmallNewsItem.vue';


export default {
  components: {
    Swiper,
    CoverItem,
    TagHeader,
    NewsItem,
    CharacterItem,
    SectionHeader,
    SmallNewsItem
  },

  async asyncData ({ params, error }){
    try{
      let [deepNews, latestNews, hotNews, character] = await Promise.all([
        axios.get('/api/news',{
          params:{
            typeId:70
          }
        }),
        axios.get('/api/news',{
          params:{
            typeId:''
          }
        }),
        axios.get('/api/news',{
          params:{
            typeId:'180'
          }
        }),
        axios.get('/api/news/character'),
      ]);

      let deepNewsList = deepNews.data.data.items;
      let bannerList = [];
      let coverSumList = [];
      deepNewsList.map((item,index)=>{
        if(index<=4){
          bannerList.push({
            img:item.cover,
            text:item.title,
            link:'/news/'+item.id
          })
        }else if(index>7 && index<=10){
          coverSumList.push({
            img:item.cover,
            text:item.title,
            link:'/news/'+item.id
          })
        }
      })
      return {
        //深度新闻列表
        deepNewsList: deepNewsList,
        //轮播列表
        bannerList:bannerList,
        //轮播图下面的三个cover
        coverSumList:coverSumList,
        //最新文章
        newsList:latestNews.data.data.items,
        //热门文章
        hotNewsList:hotNews.data.data.items,
        //人物言论
        characterSpeech:character.data.data.items
      }
    }catch(err){
      error({ statusCode: 404, message: '暂时无法获得数据，请稍后再试' })
    }
  },

  data(){
    return{
      newsTag:['最新文章','早期项目','大公司','创投新闻','AI is','消费升级','技能Get'],
      newsId:['',67,23,102,185,180,103],
      isLoadingMore:false,
    }
  },

  computed:{
    ...mapState([
      'news'
    ]),
  },

  methods:{
    ...mapMutations({
      setNewsCache: 'SET_CACHE_NEWS'
    }),

    async selectNewsType(index){
      const i = Number(index);
      this.curIndex = i;
      if(this.news[i]){
        this.newsList =this.news[i];
        return;
      }
      try{
        let {data} = await axios.get('/api/news',{
          params:{
            typeId:this.newsId[i]
          }
        });
        this.setNewsCache({
          index:i,
          newsData:data.data.items
        });
        this.newsList = data.data.items;
      }
      catch(e){
        console.log(e);
      }
    },

  }

}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.indexPage{
  .coverSum{
    margin-top: 20px;
    .CoverItem{
      display: inline-block;
      margin-right: 15px;
      width: 240px;
      height: 150px;
      &:last-child{
        margin-right:0;
      }
    }
  }
  .newsListBox{
    width: 100%;
    margin-top: 20px;
    .NewsItem{
      .bottomTips{
        span{
          font-size: 14px;
          color:@fontDefaultColor;
        }
        .lastTips{
          float: right;
        }
      }
    }
  }
  .rightContainer{
    .weekNews{
      width: 100%;
      .SmallNewsItem{
        margin-top: 10px;
        height: 70px;
        padding-bottom: 10px;
        border-bottom: 1px dashed @borderColor;
      }
    }
    .hotNews{
      margin-top: 40px;
      width: 100%;
      .CoverItem{
        width: 100%;
        margin-top:20px;
        height: 180px; 
      }
      .SmallNewsItem{
        margin-top: 20px;
      }
    }
    .characterSpeech{
      margin-top: 40px;
      width: 100%;
    }
  }
}
</style>
