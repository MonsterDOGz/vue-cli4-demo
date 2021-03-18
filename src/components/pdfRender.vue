<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 11:45:00
  * @Description: pdf嵌入页面中预览，只能预览，不支持缩放、翻页等动能
-->
<template>
  <div class="pdf_box">
    <div class="pdf_loading" v-loading="pdfLoading" element-loading-text="拼命加载中..." />
    <canvas v-for="page in pages" :id="'the-canvas' + page" :key="page" />
  </div>
</template>

<script>
import { pdfjsLib, CMAP_URL } from '@/utils/pdfjs.js';
export default {
  /**
   * 从父组件获取的pdf文件有关信息
   * @param {Object} pdfInfo
   * {
   *    url: String, 签章pdf文件的url --------必传项
   *    pdfWidth: Number, pdf文件width（ pdfWidth 和 pdfHeight 只传入一个即可，建议不要同时设置文件的 pdfWidth 和 pdfHeight ）
   *    pdfHeight: Number, pdf文件height
   * }
   */
  props: {
    pdfInfo: {
      type: Object,
      required: true,
      default: () => {
        return {
          url: '',
          pdfWidth: 900
        };
      }
    }
  },
  data() {
    return {
      pages: [], // pdf page
      pdfDoc: '',
      pdfLoading: '' // pdf加载Loading
    };
  },
  created() {
    this.$_loadFile(this.pdfInfo.url);
  },
  methods: {
    $_loadFile(url) {
      this.pdfLoading = true;
      var pdfInfo = {
        url: url,
        cMapUrl: CMAP_URL,
        cMapPacked: true
      };
      var loadingTask = pdfjsLib.getDocument(pdfInfo);
      loadingTask.promise.then(pdf => {
        this.pdfDoc = pdf;
        this.pages = pdf.numPages;
        this.$nextTick(() => {
          this.$_renderPage(1);
        });
      });
    },
    $_renderPage(num) {
      const { pdfDoc, pdfInfo, pages } = this;
      pdfDoc.getPage(num).then(page => {
        const canvas = document.getElementById('the-canvas' + num);
        const ctx = canvas.getContext('2d');
        let pdfScale = null;
        // 优先以 pdfWidth 渲染比例，没有则已 pdfHeight 渲染比例，都没有则以 pdfWidth = 900 渲染
        if (pdfInfo.pdfWidth) {
          pdfScale = parseInt(pdfInfo.pdfWidth) / page.getViewport({ scale: 1 }).width;
        } else if (pdfInfo.pdfHeight) {
          pdfScale = parseInt(pdfInfo.pdfHeight) / page.getViewport({ scale: 1 }).height;
        } else {
          pdfScale = 900 / page.getViewport({ scale: 1 }).width;
        }
        const viewport = page.getViewport({
          scale: pdfScale
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
        if (pages > num) {
          this.$_renderPage(num + 1);
        } else {
          this.pdfLoading = false; // 关闭 pdfLoading 效果
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf_box {
  width: 100%;
  height: 100%;
  overflow: auto;
  position: relative;
  .pdf_loading {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 600px;
    background-color: transparent;
    z-index: -1;
  }
}
</style>
