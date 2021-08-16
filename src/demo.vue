<template>
  <div>
    <!-- 对象渲染 -->
    <div
      class="static"
      v-bind:class="{ active: isActive, 'text-danger': hasError }"
    ></div>
    <!-- 对象渲染结果 -->
    <!-- <div class="static active"></div> -->

    <!-- 数组渲染 -->
    <div v-bind:class="[activeClass, errorClass]"></div>
    <!-- 数组渲染结果 -->
    <!-- <div class="active text-danger"></div> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      isActive: true,
      hasError: false,
      activeClass: 'active',
      errorClass: 'text-danger'
    };
  },
  created() {
    // 可以进行一些初始化操作、发起异步请求获取数据
  },
  mounted() {
    // 可以处理一些依赖 DOM 的操作（比如监听 DOM 事件）
  },
  beforeDestroy() {
    // 可以用来做一些销毁操作（比如销毁定时器）
  }
};
</script>

<style>

</style>
