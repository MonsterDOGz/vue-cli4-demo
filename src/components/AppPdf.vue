<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 11:48:03
  * @Description: pdf 模态框预览
-->
<template>
  <div class="pdf">
    <pdf-render :pdf-info="pdfInfo" class="pdf-box" />
    <div class="pdf_close" @click="$_closePdfBox">
      <svg-icon icon-class="quxiao" class-name="pdf_close-icon" />
    </div>
  </div>
</template>

<script>
import pdfRender from './pdfRender';
export default {
  props: {
    pdfInfo: {
      type: Object,
      required: true,
      default: () => {
        return { message: 'error' };
      }
    }
  },
  components: {
    pdfRender
  },
  methods: {
    $_closePdfBox() {
      this.$emit('toFatherClosePdf');
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  .pdf_box {
    width: 900px;
    height: 90vh;
    overflow-y: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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

  .pdf_close:hover {
    background-color: rgba(0, 0, 0, 0.8);

    .pdf_close-icon {
      color: #fff;
    }
  }
}
</style>
