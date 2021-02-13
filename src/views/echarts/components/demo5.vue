<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-05 09:31:28
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-05 09:45:49
 * @FilePath: /vue-cli4-demo/src/views/echarts/components/demo5.vue
 * @Description: 【描述】
-->
<template>
  <div ref="demo5" class="item"></div>
</template>

<script>
export default {
  mounted() {
    this.chart = this.$echarts.init(this.$refs.demo5);
    var data = [];
    for (let i = 0; i < 5; ++i) {
      data.push(Math.round(Math.random() * 200));
    }

    let option = {
      xAxis: {
        max: 'dataMax'
      },
      yAxis: {
        type: 'category',
        data: ['A', 'B', 'C', 'D', 'E'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2 // only the largest 3 bars will be displayed
      },
      series: [
        {
          realtimeSort: true,
          name: 'X',
          type: 'bar',
          data: data,
          label: {
            show: true,
            position: 'right',
            valueAnimation: true
          }
        }
      ],
      legend: {
        show: true
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };

    let run = () => {
      var data = option.series[0].data;
      for (var i = 0; i < data.length; ++i) {
        if (Math.random() > 0.9) {
          data[i] += Math.round(Math.random() * 2000);
        } else {
          data[i] += Math.round(Math.random() * 200);
        }
      }
      this.chart.setOption(option);
    };

    setTimeout(function () {
      run();
    }, 0);
    setInterval(function () {
      run();
    }, 3000);
  }
};
</script>

<style land="scss" scoped>
.item {
  width: 1200px !important;
  height: 600px !important;
}
</style>
