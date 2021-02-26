<!--
 * @Author: MonsterDOG
 * @Date: 2020-07-31 18:15:05
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 11:09:56
 * @FilePath: /vue-cli4-demo/src/components/loading/AppLoading.vue
 * @Description: 【描述】
-->
<template>
  <transition name="fade">
    <!--loading蒙版-->
    <div v-show="visible" class="mask">
      <!--loading中间的图标-->
      <div class="spinner">
        <!-- <svg class="icon iconLoading" aria-hidden="true">
          <use xlink:href="#icon-loading"></use>
        </svg> -->
        <svg-icon icon-class="loading" class-name="iconLoading" />
        <!--loading上面显示的文字-->
        <p class="text">{{ text }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      text: '',
      visible: false
    };
  }
};
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .iconLoading {
      color: #409eff;
      font-size: 28px;
      display: inline-block;
      border-radius: 50%;
      animation: clockwise 1.5s linear infinite;
    }
    .text {
      color: #409eff;
      margin-top: 16px;
    }
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
