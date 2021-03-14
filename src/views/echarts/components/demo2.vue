<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-03 14:33:46
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:58:05
 * @FilePath: /vue-cli4-demo/src/views/echarts/components/demo2.vue
 * @Description: 【描述】
-->
<template>
  <div ref="demo2" class="item"></div>
</template>

<script>
import echarts from '@/utils/echarts';

export default {
  mounted() {
    this.chart = echarts.init(this.$refs.demo2);
    this.chart.setOption({
      tooltip: {},
      dataset: [
        {
          source: [
            ['Product', 'Sales', 'Price', 'Year'],
            ['Cake', 123, 32, 2011],
            ['Latte', 231, 14, 2011],
            ['Tofu', 235, 5, 2011],
            ['Milk Tee', 341, 25, 2011],
            ['Porridge', 122, 29, 2011],
            ['Cake', 143, 30, 2012],
            ['Latte', 201, 19, 2012],
            ['Tofu', 255, 7, 2012],
            ['Milk Tee', 241, 27, 2012],
            ['Porridge', 102, 34, 2012],
            ['Cake', 153, 28, 2013],
            ['Latte', 181, 21, 2013],
            ['Tofu', 395, 4, 2013],
            ['Milk Tee', 281, 31, 2013],
            ['Porridge', 92, 39, 2013],
            ['Cake', 223, 29, 2014],
            ['Latte', 211, 17, 2014],
            ['Tofu', 345, 3, 2014],
            ['Milk Tee', 211, 35, 2014],
            ['Porridge', 72, 24, 2014]
          ]
        },
        {
          transform: {
            type: 'filter',
            config: { dimension: 'Year', value: 2014 }
            // 这个筛选条件表示，遍历数据，筛选出维度（ dimension ）
            // 'Year' 上值为 2011 的所有数据项。
          }
        }
      ],
      series: {
        type: 'pie',
        datasetIndex: 1
      }
    });
  }
};
</script>

<style>
</style>
