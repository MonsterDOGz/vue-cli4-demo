<!--
 * @Author: MonsterDOG
 * @Date: 2021-08-16 16:55:16
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-08-21 17:47:55
 * @FilePath: \vue-cli4-demo\src\demo.vue
 * @Description: 【描述】
-->
<template>
  <div>
    <span>{{ name }}</span>
    <span>{{ labelName }}</span>
  </div>
</template>

<script>
export default {
  computed: {
    // 组件中使用仓库的 state
    name() {
      return this.$store.state.name;
    },
    // 组件中使用仓库的 getter
    labelName() {
      return this.$store.getters.labelName;
    }
  },
  created() {
    // 组件中调用 actions 方法去改变状态值
    this.$store.dispatch('queryName', { username: 'gc', password: '******' });
  }
};
</script>

<style></style>
