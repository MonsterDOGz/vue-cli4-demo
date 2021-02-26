<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 15:58:24
  * @Description: pdf预览，只能预览，不支持缩放、翻页等功能
-->
<template>
  <div class="pdf">
    <div class="pdf_box" v-loading="pdfLoading" element-loading-text="拼命加载中...">
      <canvas v-for="page in pages" :id="'the-canvas' + page" :key="page"></canvas>
    </div>
    <div class="pdf_close" @click="$_closePdfBox">
      <i class="iconfont iconquxiao pdf_close-icon"></i>
    </div>
  </div>
</template>

<script>
import { pdfjsLib, CMAP_URL } from '@/utils/pdfjs.js';
export default {
  props: {
    pdfUrl: {
      type: Object,
      required: true,
      default: () => {
        return { message: 'error' };
      }
    }
  },
  data() {
    return {
      pages: [],
      pdfDoc: '',
      pdfLoading: '' // pdf加载Loading
    };
  },
  created() {
    this.$_loadFile(this.pdfUrl.url);
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
    $_renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        const canvas = document.getElementById('the-canvas' + num);
        const ctx = canvas.getContext('2d');
        const viewport = page.getViewport({
          scale: 900 / page.getViewport({ scale: 1 }).width
        });
        canvas.width = viewport.width;
        canvas.height = viewport.height;
        canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';
        const renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        this.pdfLoading = false; // 关闭pdfLoading效果
        if (this.pages > num) {
          this.$_renderPage(num + 1);
        }
        this.$emit('toFather');
      });
    },
    $_loadFile(url) {
      this.pdfLoading = true; // 打开pdfLoading效果
      var pdfInfo = {
        url: url,
        cMapUrl: CMAP_URL,
        cMapPacked: true
      };
      var loadingTask = pdfjsLib.getDocument(pdfInfo);
      loadingTask.promise.then(pdf => {
        this.pdfDoc = pdf;
        this.pages = this.pdfDoc.numPages;
        this.$nextTick(() => {
          this.$_renderPage(1);
        });
      });
    },
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
