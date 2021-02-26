<!--
  * @Author：xiaolong
  * @Date: 2020-08-11 15:30:00
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 16:00:19
  * @Description: pdf预览，支持缩放、翻页等功能
-->
<template>
  <div class="pdf_viewer">
    <div class="pdf_viewer-box">
      <iframe
        :src="'public/pdf/web/viewer.html?file=' + `${encodeURIComponent(pdfUrl.url)}`"
        frameborder="0"
        class="pdf_viewer-pdf"
      ></iframe>
    </div>
    <div class="pdf_close" @click="$_closePdf">
      <i class="iconfont iconquxiao pdf_close-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  /**
   * 从父组件传入pdf信息，以对象形式传入，必须包含url字段，目前只能预览一张pdf
   * eg:
   * pdfUrl: {
   *   url: 'https://xitianqujing.oss-cn-hangzhou.aliyuncs.com/001213d1ebcd497e96aacd07c622cc75.pdf'
   * }
   */
  props: {
    pdfUrl: {
      type: Object,
      required: true,
      default: () => {
        return { message: 'error' };
      }
    }
  },
  mounted() {
    document.body.style.cssText = `overflow: hidden; padding-right: ${
      window.innerWidth - document.body.clientWidth
    }px`;
    this.$once('hook:beforeDestroy', () => {
      document.body.style.cssText = 'overflow: visiable';
    });
  },
  methods: {
    // 抛出关闭钩子
    $_closePdf() {
      this.$emit('toFatherClosePdf');
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf_viewer {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  z-index: 1000;

  .pdf_viewer-box {
    width: 1200px;
    height: 95%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0px 0px 4px 4px rgba(0, 0, 0, 0.2);

    .pdf_viewer-pdf {
      width: 100%;
      height: 100%;
    }
  }

  .pdf_close {
    background-color: rgba(0, 0, 0, 0.5);
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: absolute;
    top: -50px;
    right: -50px;
    cursor: pointer;
    transition: 0.15s;

    &:hover {
      background-color: rgba(0, 0, 0, 0.8);

      .pdf_close-icon {
        color: #fff;
      }
    }

    .pdf_close-icon {
      font-size: 22px;
      position: absolute;
      left: 30%;
      bottom: 30%;
      transform: translate(-50%, 50%);
      color: #ccc;
      font-weight: bold;
    }
  }
}
</style>
