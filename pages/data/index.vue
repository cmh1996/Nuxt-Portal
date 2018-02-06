<template>
  <div class="Data">
    <div ref="echartsBox" class="echartsBox" style="width:800px;height:500px;"></div>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require('echarts/lib/chart/pie');
require('echarts/lib/component/title');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/toolbox');
require('echarts/lib/component/legend');
require('echarts/lib/component/markPoint');
require('echarts/lib/component/markLine');

export default {
	layout: 'default',
	scrollToTop: true,

  mounted(){
    let myChart = echarts.init(this.$refs.echartsBox);
    const option = {
      //标题
      title:{
        text:'echarts练手',
        show:true,
        subtext:'By Chambers',
        left:80,
        borderColor:'#fff',
        borderWidth:1
      },
      //工具箱
      toolbox:{
        show:true,
        feature:{
          dataView:{
            show:true
          },
          restore:{
            show:true
          },
          dataZoom:{
            show:true
          },
          saveAsImage:{
            show:true
          },
          magicType:{
            type:['line','bar']
          },
        }
      },
      //鼠标hover时显示的tooltip
      tooltip:{
        trigger:'item'
      },
      //图例
      legend:{
        data:['销量']
      },
      //x轴
      xAxis:{
        data:['衬衫','T恤','毛衣']
      },
      yAxis:{},
      //数据
      series:[{
        name:'销量',
        type:'bar',
        data:[12,23,13],
      },{
        name:'销量',
        type:'line',
        data:[12,23,13],
        markPoint:{
          data:[
            {type:'max',name:'最大值'},
            {type:'min',name:'最小值'}
          ]
        },
        markLine:{
          data:[
            {type:'average',name:'平均值'}
          ]
        }
      }]
    };

    myChart.setOption(option);
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