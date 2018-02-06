<template>
  <p>集市</p>
</template>

<script>
//import Logo from '~/components/Logo.vue'

export default {
	layout: 'default',
	scrollToTop: true,

  	components: {
    	//Logo
  	},

  	data () {
    	return { project: 'default' }
  	},

  	asyncData (ctx) {
  	}
}
</script>

<style scoped lang="less">
.container{
  .aa{
    font-size: 200px;
  }
}
</style>