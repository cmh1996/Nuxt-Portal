<template>
  <div class="NewsDetail">
    <div class="leftContainer">
      <section class="newsContent">
        <h1>{{newsData.title}}</h1>
        <div class="newsTips">
          {{
            (newsData.user?newsData.user.name+' • ':'')+(newsData.created_at.substring(5,10)+' • ')+newsData.column.name
          }}
        </div>
        <div class="newsSum">
          {{newsData.summary}}
        </div>
        <div ref="newsText" class="newsText" v-html="newsData.content"></div>
      </section>
    </div>
    <div class="rightContainer">
      <ul class="authorData">
        <SectionHeader :title="'专栏作者'"/>
        <CharacterItem
          :img="author.headimg"
          :title="author.name"
          :desc="author.desc"
        >
          <ul class="authorArticle" slot="characterElse">
            <h3>最近文章</h3>
            <SmallNewsItem 
              v-for="(item,index) in author.post" 
              :key="'post'+item.id"
              :link="'/news/'+item.id"
              :text="item.title"
              :tips="item.published_at.substring(5,10)"
            />
          </ul>
        </CharacterItem>
      </ul>
      <ul class="relateArticle">
        <SectionHeader :title="'相关文章'"/>
        <CoverItem v-for="(item,index) in newsData.related_posts" :key="'relate'+item.id" :coverObj="{
          link:'/news/'+item.id,
          img:item.cover,
          text:item.title
        }"/>
      </ul>
    </div>
  </div>
</template>

<script>
import {clientAxios as axios} from '~/plugins/axios';
import {decode} from '~/util/util';
import CharacterItem from '~/components/CharacterItem.vue';
import SectionHeader from '~/components/SectionHeader.vue';
import SmallNewsItem from '~/components/SmallNewsItem.vue';
import CoverItem from '~/components/CoverItem.vue';

export default {
  components: {
    CharacterItem,
    SectionHeader,
    SmallNewsItem,
    CoverItem
  },

  async asyncData ({ params, error }) {
    try{
      let {data} = await axios.get('/api/news/detail',{
          params:{
            newsId:params.id
          }
      });

      data.data.content = decode(data.data.content);
      return {
        newsData:data.data
      }
    }catch(err){
      error({ statusCode: 404, message: '该文章不存在' })
    }
  },

  head () {
    return {
      title: '文章详情'
    }
  },

  mounted(){
    //设置正文样式
    let p = Array.from(this.$refs.newsText.getElementsByTagName("p"));
    let h3 = Array.from(this.$refs.newsText.getElementsByTagName("h3"));
    let img = Array.from(this.$refs.newsText.getElementsByTagName("img"));
    let a = Array.from(this.$refs.newsText.getElementsByTagName("a"));
    p.map((item,index)=>{
      item.style.marginBottom = '26px';
      item.style.lineHeight = '28px';
      item.style.fontSize = '15px';
      item.style.color = '#3d464d';
    });
    h3.map((item,index)=>{
      item.style.marginBottom = '26px';
    });
    img.map((item,index)=>{
      item.style.margin = '30px auto';
      item.style.borderRadius = '5px';
      item.style.display = 'block';
      item.style.maxWidth = '100%';
    });
    a.map((item,index)=>{
      item.style.color = '#4285f4';
      item.style.borderStyle = 'solid';
      item.style.borderWidth = '0 0 1px';
      item.style.borderColor = '#4285f4';
      item.style.padding = '0 0 1px';
    });

    if(this.newsData.user){
      this.fetchAuthorData(this.newsData.user.id);
    }
  },

  data(){
    return{
      author:{
        headimg:'',
        name:'',
        desc:'',
        post:[]
      }
    }
  },

  methods:{
    //获取作者数据
    async fetchAuthorData(authorId){
      let {data} = await axios.get('/api/news/author',{
          params:{
            authorId:authorId
          }
      });
      this.author = Object.assign(this.author,{
        headimg:data.data.avatar_url,
        name:data.data.name,
        desc:data.data.introduction,
        post:data.data.posts
      })
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.NewsDetail{
  .leftContainer{
    .newsContent{
      h1{
          color: @fontDeepColor;
          font-size: 26px;
          font-weight: 600;
          margin-bottom: 28px;
          text-align: left;
          line-height: 36px;
      }
      .newsTips{
        font-size: 14px;
        height: 25px;
        line-height: 25px;
        color:@fontDefaultColor;
      }
      .newsSum{
          padding: 15px 0;
          color: #999;
          font-size: 15px;
          margin-bottom: 0;
          line-height: 20px;
          &:after{
            display: block;
            width: 160px;
            height: 4px;
            border-radius: 3px;
            background: #efefef;
            content: "";
            margin-top: 10px;
          }
      }
      .newsText{
      }
    }
  }
  .rightContainer{
    .authorData{
      .authorArticle{
        margin-top: 20px;
        h3{
          margin-bottom: 20px;
          font-size: 16px;
          text-align: left;
          color:@secondColor;
        }
        .SmallNewsItem{
          margin-bottom: 10px;
        }
      }
    }
    .relateArticle{
      .CoverItem{
        width: 100%;
        margin-top:20px;
        height: 180px;
      }
    }
  }
}
</style>
http://tx.acgvideo.com/71/40/26594071/26594071-1-16.mp4?txTime=1510992000&platform=html5&txSecret=9d848358fac1c1c75c6859048044b8fc&oi=3698571147&rate=65000&hfb=3f6ef0f36bdbbf909ca0b9a6fa0b2fa3

http://tx.acgvideo.com/71/40/26594071/26594071-1-16.mp4?txTime=1510992239&platform=html5&txSecret=fcaea8f4ec40822ad2007a0f807fc83b&oi=3698571147&rate=65000&hfb=3f6ef0f36bdbbf909ca0b9a6fa0b2fa3