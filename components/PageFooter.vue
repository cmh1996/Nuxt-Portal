<template>
  <footer class="PageFooter">
    <div class="minContainer">
    	<ul class="footerTop clear">
    		<li>关于我们</li>
    		<li>加入我们</li>
    		<li>合作伙伴</li>
    		<li>广告及服务</li>
    		<li>常见问题解答</li>
    		<li>防网络诈骗专题</li>
    	</ul>
    	<div class="footerBottom">
    		<p>Copyright © TWO 京ICP备12013432号-1  京公网安备 11010102001402号   本站由阿里云提供计算与安全服务</p>
    	</div>
    </div>
  </footer>
</template>

<script>
export default {
}
</script>

<style scoped lang="less">
@import "~assets/css/var.less";
.PageFooter{
	background-color: #2d3237;
	overflow: hidden;
	width: 100%;
	height: 128px;
	color:@fontDefaultColor;
	font-size: 15px;
	padding: 40px 0;
	.footerTop{
		li{
			float: left;
			margin-right: 20px;
		}
	}
	.footerBottom{
		margin-top: 20px;
		p{

		}
	}
}
</style>
