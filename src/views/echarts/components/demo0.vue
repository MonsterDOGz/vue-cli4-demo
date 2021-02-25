<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-25 10:57:42
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 11:03:00
 * @FilePath: /vue-cli4-demo/src/views/echarts/components/demo0.vue
 * @Description: 【描述】
-->
<template>
  <div class="item-box">
    <div ref="echarts" class="item"></div>
    <div ref="pie" class="item"></div>
  </div>
</template>

<script>
import '../vintage';
export default {
  data() {
    return {
      data: [
        {
          value: 235,
          name: '视频广告'
        },
        {
          value: 274,
          name: '联盟广告'
        },
        {
          value: 310,
          name: '邮件营销'
        },
        {
          value: 335,
          name: '直接访问'
        },
        {
          value: 400,
          name: '搜索引擎'
        }
      ]
    };
  },
  mounted() {
    this.initCharts();
  },
  methods: {
    // 初始化图表
    initCharts() {
      this.chart = this.$echarts.init(this.$refs.echarts, 'vintage');
      this.setOptions();
      this.chart2 = this.$echarts.init(this.$refs.pie);
      this.chart2.showLoading();
      this.setOptions2();
      setTimeout(() => {
        this.chart2.setOption({
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: '55%',
              roseType: 'angle',
              itemStyle: {
                color: '#c23531',
                shadowBlur: 200,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              },
              label: {
                textStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              },
              labelLine: {
                lineStyle: {
                  color: 'rgba(255, 255, 255, 0.3)'
                }
              },
              data: this.data
            }
          ]
        });
        this.chart2.hideLoading();
      }, 3000);
    },
    // 设置图表
    setOptions() {
      this.chart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量柱状图',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '销量折线图',
            type: 'line',
            data: [5, 20, 36, 10, 10, 20]
          },
          {
            name: '销量饼图',
            type: 'pie',
            radius: 30,
            center: ['80%', 60],
            data: [
              { name: '衬衫', value: 5 },
              { name: '羊毛衫', value: 20 },
              { name: '雪纺衫', value: 36 },
              { name: '裤子', value: 10 },
              { name: '高跟鞋', value: 10 },
              { name: '袜子', value: 20 }
            ]
          }
        ]
      });
    },
    setOptions2() {
      this.chart2.setOption({
        backgroundColor: '#2c343c',
        visualMap: [
          {
            show: false,
            min: 80,
            max: 600,
            inRange: {
              colorLightness: [0, 1]
            }
          }
        ]
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.item-box {
  width: 1200px !important;
  // height: 400px !important;
  .item {
    width: 600px;
    height: 400px;
    display: inline-block;
  }
}
</style>
