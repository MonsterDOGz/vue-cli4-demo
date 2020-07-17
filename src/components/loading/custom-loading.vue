<template>
  <transition name="fade">
    <!--loading蒙版-->
    <div v-show="visible" class="mask">
      <!--loading中间的图标-->
      <div class="spinner">
        <i class="iconfont icon-loading1 iconLoading"></i>
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
.mask {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, .8);
  .spinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    .iconLoading {
      color: #409EFF;
      font-size: 28px;
      display: inline-block;
      border-radius: 50%;
      animation: clockwise 2s linear infinite;
    }
    .text {
      color: #409EFF;
      margin-top: 16px;
    }
  }
}
.fade-enter-active, .fade-leave-active {
  transition: .3s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(-6px);
}
@keyframes clockwise {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
