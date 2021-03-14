<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-01 11:38:39
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:54:08
 * @FilePath: /vue-cli4-demo/src/views/echarts/index.vue
 * @Description: 【描述】
-->
<template>
  <div class="box">
    <demo0 class="item" />
    <!-- <demo1 class="item" /> -->
  </div>
</template>

<script>
import Demo0 from './components/demo0';
// import Demo1 from './components/demo1';
export default {
  components: {
    Demo0
    // Demo1
  }
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  .item {
    width: 600px;
    height: 400px;
  }
}
</style>
