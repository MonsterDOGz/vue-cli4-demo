<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-04 17:50:32
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:45:56
 * @FilePath: /vue-cli4-demo/src/views/echarts/components/demo4.vue
 * @Description: 【描述】
-->
<template>
  <div ref="demo4" class="item"></div>
</template>

<script>
import echarts from '@/utils/echarts';
export default {
  mounted() {
    this.chart = echarts.init(this.$refs.demo4);
    let option = {
      title: {
        text: '饼图程序调用高亮示例',
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
    app.currentIndex = -1;
    setInterval(() => {
      var dataLen = option.series[0].data.length;
      // 取消之前高亮的图形
      this.chart.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: app.currentIndex
      });
      app.currentIndex = (app.currentIndex + 1) % dataLen;
      // 高亮当前图形
      this.chart.dispatchAction({
        type: 'highlight',
        seriesIndex: 0,
        dataIndex: app.currentIndex
      });
      // 显示 tooltip
      this.chart.dispatchAction({
        type: 'showTip',
        seriesIndex: 0,
        dataIndex: app.currentIndex
      });
    }, 1000);
    this.chart.setOption(option);
  }
};
</script>

<style>
</style>
