<template>
  <div class="root">
    <header class="mainHeader">
        <div class="container">
          <nuxt-link :to="{name: 'index'}" class="logoBox">
            <img src="http://tvax4.sinaimg.cn/crop.0.0.480.480.180/768c39d5ly8fjje1d0teej20dc0dcq35.jpg" alt="logo"/>
            <span>TWO</span>
          </nuxt-link>
          <nav>
            <nuxt-link :to="{name: 'index'}" :class="[{'selected':this.curPath==='/'},'navItem']">首页</nuxt-link>
            <nuxt-link :to="{name: 'market'}" :class="[{'selected':this.curPath==='/market'},'navItem']">集市</nuxt-link>
            <nuxt-link :to="{name: 'video'}" :class="[{'selected':this.curPath==='/video'},'navItem']">视频</nuxt-link>
            <nuxt-link :to="{name: 'game'}" :class="[{'selected':this.curPath==='/game'},'navItem']">游戏</nuxt-link>
            <nuxt-link :to="{name: 'data'}" :class="[{'selected':this.curPath==='/data'},'navItem']">数据</nuxt-link>
          </nav>
          <div class="user">
            <span class="login">登录</span>
            <i class="midLine" />
            <span class="signup">注册</span>
          </div>
        </div>
    </header>
    <div class="container pageContent">
      <nuxt/>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
        curPath:this.$route.path
    }
  },
  watch:{
    '$route'(to,from){
        this.curPath = to.path;
    }
  }
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.root{
    width: 100%;
    padding-top: 60px;
    .mainHeader{
        width:100%;
        height: 60px;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 10000;
        border-bottom: 2px solid @borderColor;
        background-color: white;
        .logoBox{
            width: 130px;
            height: 60px;
            line-height: 60px;
            display: inline-block;
            overflow: hidden;
            img{
                display: inline-block;
                width: 45px;
                height: 40px;
                border-radius: 50%;
                vertical-align: middle;
            }
            span{
                font-size: 20px;
                font-weight: bold;
                color:@mainColor;
                vertical-align: middle;
                display: inline-block;
                margin-left: 10px;
            }
        }
        nav{
            display: inline-block;
            height: 60px;
            line-height: 60px;
            margin-left: 20px;
            overflow: hidden;
            .navItem{
                width: 50px;
                display: inline-block;
                margin-right: 20px;
                height: 58px;
                text-align: center;
                color:black;
                &:hover{
                    color:@secondColor;
                }
            }
            .selected{
                border-bottom: 2px solid @mainColor;
                font-weight: bold;
            }
        }
        .user{
            display: inline-block;
            overflow: hidden;
            height: 60px;
            line-height: 60px;
            float: right;
            span{
                display: inline-block;
                width: 40px;
                text-align: center;
                margin: 0 10px;
                cursor: pointer;
                &:hover{
                    color:#0e90d2;
                }
            }
            .midLine{
                width: 1px;
                height: 20px;
                display: inline-block;
                vertical-align: middle;
                background-color: @borderColor
            }
        }
    }
    .pageContent{
        overflow: hidden;
        margin-bottom: 60px;
    }
}
</style>
