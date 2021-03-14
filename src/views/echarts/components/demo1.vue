<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-02 15:25:17
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:53:41
 * @FilePath: /vue-cli4-demo/src/views/echarts/components/demo1.vue
 * @Description: 【描述】dataset demo
-->
<template>
  <div ref="demo1" class="item"></div>
</template>

<script>
import echarts from '@/utils/echarts';
import axios from 'axios';
import '../vintage';
const req = axios.create();
const url =
  'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/data/life-expectancy-table.json';
const sizeValue = '57%';
const symbolSize = 2.5;
export default {
  data() {
    return {
      option: {
        legend: {},
        tooltip: {},
        toolbox: {
          left: 'center',
          feature: {
            dataZoom: {}
          }
        },
        grid: [
          { right: sizeValue, bottom: sizeValue },
          { left: sizeValue, bottom: sizeValue },
          { right: sizeValue, top: sizeValue },
          { left: sizeValue, top: sizeValue }
        ],
        xAxis: [
          { type: 'value', gridIndex: 0, name: 'Income', axisLabel: { rotate: 50, interval: 0 } },
          {
            type: 'category',
            gridIndex: 1,
            name: 'Country',
            boundaryGap: false,
            axisLabel: { rotate: 50, interval: 0 }
          },
          { type: 'value', gridIndex: 2, name: 'Income', axisLabel: { rotate: 50, interval: 0 } },
          {
            type: 'value',
            gridIndex: 3,
            name: 'Life Expectancy',
            axisLabel: { rotate: 50, interval: 0 }
          }
        ],
        yAxis: [
          { type: 'value', gridIndex: 0, name: 'Life Expectancy' },
          { type: 'value', gridIndex: 1, name: 'Income' },
          { type: 'value', gridIndex: 2, name: 'Population' },
          { type: 'value', gridIndex: 3, name: 'Population' }
        ],
        dataset: {
          dimensions: [
            'Income',
            'Life Expectancy',
            'Population',
            'Country',
            { name: 'Year', type: 'ordinal' }
          ],
          source: null
        },
        series: [
          {
            type: 'scatter',
            symbolSize: symbolSize,
            xAxisIndex: 0,
            yAxisIndex: 0,
            encode: {
              x: 'Income',
              y: 'Life Expectancy',
              tooltip: [0, 1, 2, 3, 4]
            }
          },
          {
            type: 'scatter',
            symbolSize: symbolSize,
            xAxisIndex: 1,
            yAxisIndex: 1,
            encode: {
              x: 'Country',
              y: 'Income',
              tooltip: [0, 1, 2, 3, 4]
            }
          },
          {
            type: 'scatter',
            symbolSize: symbolSize,
            xAxisIndex: 2,
            yAxisIndex: 2,
            encode: {
              x: 'Income',
              y: 'Population',
              tooltip: [0, 1, 2, 3, 4]
            }
          },
          {
            type: 'scatter',
            symbolSize: symbolSize,
            xAxisIndex: 3,
            yAxisIndex: 3,
            encode: {
              x: 'Life Expectancy',
              y: 'Population',
              tooltip: [0, 1, 2, 3, 4]
            }
          }
        ]
      }
    };
  },
  async mounted() {
    this.chart = echarts.init(this.$refs.demo1, 'vintage');
    const { data } = await req.get(url);
    this.option.dataset.source = data;
    this.chart.setOption(this.option);
  }
};
</script>

<style lang="scss" scoped>
.item {
  width: 1200px !important;
  height: 800px !important;
}
</style>
