<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-01 11:38:39
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-04-16 16:44:16
 * @FilePath: /vue-cli4-demo/src/views/echarts/index2/index.vue
 * @Description: 【描述】
-->
<template>
  <div class="box">
    <demo2 class="item" />
    <demo4 class="item" />
    <demo3 class="item" />
    <demo5 class="item" />
    <img
      v-lazy="
        'https://res.cloudinary.com/dzq1l03yt/image/upload/v1593513400/Nature/image_18_lwam5y.jpg'
      "
    />
    <img
      v-lazy="
        'https://res.cloudinary.com/dzq1l03yt/image/upload/v1593513400/Nature/image_18_lwam5y.jpg'
      "
    />
    <img
      v-lazy="
        'https://res.cloudinary.com/dzq1l03yt/image/upload/v1593513400/Nature/image_18_lwam5y.jpg'
      "
    />
    <img
      v-lazy="
        'https://res.cloudinary.com/dzq1l03yt/image/upload/v1593513400/Nature/image_18_lwam5y.jpg'
      "
    />
    <img
      v-lazy="
        'https://res.cloudinary.com/dzq1l03yt/image/upload/v1593513400/Nature/image_18_lwam5y.jpg'
      "
    />
    <img
      v-lazy="
        'https://res.cloudinary.com/dzq1l03yt/image/upload/v1593513400/Nature/image_18_lwam5y.jpg'
      "
    />
  </div>
</template>

<script>
import Demo2 from '../components/demo2';
import Demo3 from '../components/demo3';
import Demo4 from '../components/demo4';
import Demo5 from '../components/demo5';
export default {
  components: {
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
  padding: 20px;
  .item {
    width: 600px;
    height: 400px;
  }
}
</style>
