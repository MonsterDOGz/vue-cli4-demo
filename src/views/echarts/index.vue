<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-01 11:38:39
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 11:03:45
 * @FilePath: /vue-cli4-demo/src/views/echarts/index.vue
 * @Description: 【描述】
-->
<template>
  <div class="box">
    <demo0 class="item" />
    <demo1 class="item" />
    <demo2 class="item" />
    <demo4 class="item" />
    <demo3 class="item" />
    <demo5 class="item" />
  </div>
</template>

<script>
import Demo0 from './components/demo0';
import Demo1 from './components/demo1';
import Demo2 from './components/demo2';
import Demo3 from './components/demo3';
import Demo4 from './components/demo4';
import Demo5 from './components/demo5';
export default {
  components: {
    Demo0,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  width: 1200px;
  .item {
    width: 600px;
    height: 400px;
  }
}
</style>
