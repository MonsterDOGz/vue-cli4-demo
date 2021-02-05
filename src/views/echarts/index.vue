<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-01 11:38:39
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-05 09:33:34
 * @FilePath: /vue-cli4-demo/src/views/echarts/index.vue
 * @Description: 【描述】
-->
<template>
  <div class="box">
    <div ref="echarts" class="item"></div>
    <div ref="pie" class="item"></div>
    <demo1 class="item" />
    <demo2 class="item" />
    <demo4 class="item" />
    <demo3 class="item" />
    <demo5 class="item" />
  </div>
</template>

<script>
import Demo1 from './components/demo1';
import Demo2 from './components/demo2';
import Demo3 from './components/demo3';
import Demo4 from './components/demo4';
import Demo5 from './components/demo5';
import './vintage.js';
import './chalk.js';
export default {
  components: {
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5
  },
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
  created() {},
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
.box {
  display: flex;
  flex-wrap: wrap;
  .item {
    width: 600px;
    height: 400px;
  }
}
</style>
