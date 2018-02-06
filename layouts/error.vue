<template>
  <section class="container Error">
    <img src="../assets/img/logo.png" alt="Nuxt.js Logo" class="logo" />
    <h1 class="title">
      {{ error.statusCode }}
    </h1>
    <h2 class="info">
      {{ error.message }}
    </h2>
    <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
      返回首页
    </nuxt-link>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.Error{
  width: 100%;
  text-align: center;
  .title
  {
    margin-top: 15px;
    font-size: 38px;
  }
  .info
  {
    font-weight: 300;
    color: #9aabb1;
    margin: 10px;
  }
  .button
  {
    margin-top: 30px;
    display: inline-block;
    border: 1px solid @mainColor;
    width: 80px;
    height: 36px;
    text-align: center;
    line-height: 36px;
  }
}
</style>
