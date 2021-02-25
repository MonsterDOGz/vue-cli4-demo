<!--
 * @Author: MonsterDOG
 * @Date: 2021-02-25 11:06:10
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 11:19:04
 * @FilePath: /vue-cli4-demo/src/views/cyberpunk/index.vue
 * @Description: 【描述】
-->
<template>
  <div class="cyberpunk-box">
    <CyberButton />
  </div>
</template>

<script>
import CyberButton from '@/components/CyberButton.vue';
export default {
  components: {
    CyberButton
  }
};
</script>

<style lang="scss" scoped>
.cyberpunk-box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f005;
}
</style>
