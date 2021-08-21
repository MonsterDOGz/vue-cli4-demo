<!-- 父组件 -->
<template>
  <div>
    <!-- 使用 Demo 组件 -->
    <component-demo
      v-bind:father-value="'爸爸的值'"
      v-on:son-value="handlerValue()"
    />
  </div>
</template>

<script>
import Demo from './demo.vue'; // 使用 ES Module 引入组件
export default {
  // 局部注册组件
  components: {
    componentDemo: Demo
  },
  methods: {
    handlerValue(value) {
      console.log(value); // 儿子的值
    }
  }
};
</script>

<style></style>
