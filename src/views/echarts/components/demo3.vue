<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-04 16:10:55
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-04 17:31:56
 * @FilePath: /vue-cli4-demo/src/views/echarts/components/demo3.vue
 * @Description: 【描述】
-->
<template>
  <div ref="demo3" class="item"></div>
</template>

<script>
var data1 = [];
var data2 = [];
var data3 = [];

var random = function (max) {
  return (Math.random() * max).toFixed(3);
};

for (var i = 0; i < 500; i++) {
  data1.push([random(15), random(10), random(1)]);
  data2.push([random(10), random(10), random(1)]);
  data3.push([random(15), random(10), random(1)]);
}
export default {
  mounted() {
    this.chart = this.$echarts.init(this.$refs.demo3);
    this.chart.setOption({
      animation: true,
      legend: {
        data: ['scatter', 'scatter2', 'scatter3']
      },
      tooltip: {},
      xAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        splitLine: {
          show: true
        }
      },
      yAxis: {
        type: 'value',
        min: 'dataMin',
        max: 'dataMax',
        splitLine: {
          show: true
        }
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 1,
          end: 35
        },
        {
          type: 'slider',
          show: true,
          yAxisIndex: [0],
          left: '93%',
          start: 29,
          end: 36
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 1,
          end: 35
        },
        {
          type: 'inside',
          yAxisIndex: [0],
          start: 29,
          end: 36
        }
      ],
      series: [
        {
          name: 'scatter',
          type: 'scatter',
          itemStyle: {
            normal: {
              opacity: 0.8
            }
          },
          symbolSize: function (val) {
            return val[2] * 40;
          },
          data: data1
        },
        {
          name: 'scatter2',
          type: 'scatter',
          itemStyle: {
            normal: {
              opacity: 0.8
            }
          },
          symbolSize: function (val) {
            return val[2] * 40;
          },
          data: data2
        },
        {
          name: 'scatter3',
          type: 'scatter',
          itemStyle: {
            normal: {
              opacity: 0.8
            }
          },
          symbolSize: function (val) {
            return val[2] * 40;
          },
          data: data3
        }
      ]
    });
    this.chart.on('click', function (params) {
      // 控制台打印数据的名称
      console.log(params);
    });
  }
};
</script>

<style land="scss" scoped>
.item {
  width: 1200px !important;
  height: 600px !important;
}
</style>
