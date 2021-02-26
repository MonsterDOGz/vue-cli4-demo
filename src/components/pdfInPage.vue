<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 15:59:28
  * @Description: pdf嵌入页面中预览，只能预览，不支持缩放、翻页等动能
-->
<template>
  <div class="pdf_page">
    <canvas
      v-for="page in pages"
      :id="
        pdfInPageInfo.uploadId ? 'the-canvas' + page + pdfInPageInfo.uploadId : 'the-canvas' + page
      "
      :key="page"
    ></canvas>
  </div>
</template>

<script>
import { pdfjsLib, CMAP_URL } from '@/utils/pdfjs.js';
export default {
  /**
   * 从父组件获取的pdf文件有关信息
   * @param {Object} pdfInPageInfo
   * {
   *    pdfUrl: String, 签章pdf文件的url --------必传项
   *    pdfWidth: Number, pdf文件width（ pdfWidth 和 pdfHeight 只传入一个即可，建议不要同时设置文件的 pdfWidth 和 pdfHeight ）
   *    pdfHeight: Number, pdf文件height
   *    uploadId: Number pdf文件uploadId，默认可不传，如果传递了用来区分多个画布
   * }
   */
  props: {
    pdfInPageInfo: {
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
      pdfDoc: ''
    };
  },
  created() {
    this.$_loadFile(this.pdfInPageInfo.pdfUrl);
  },
  methods: {
    $_loadFile(url) {
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
    $_renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        let canvas = '';
        if (this.pdfInPageInfo.uploadId) {
          canvas = document.getElementById('the-canvas' + num + this.pdfInPageInfo.uploadId);
        } else {
          canvas = document.getElementById('the-canvas' + num);
        }
        if (!canvas) {
          return;
        }
        const ctx = canvas.getContext('2d');
        var pdfScale = null;
        if (this.pdfInPageInfo.pdfWidth) {
          pdfScale = parseInt(this.pdfInPageInfo.pdfWidth) / page.getViewport({ scale: 1 }).width;
        } else if (this.pdfInPageInfo.pdfHeight) {
          pdfScale = parseInt(this.pdfInPageInfo.pdfHeight) / page.getViewport({ scale: 1 }).height;
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
        this.$emit('toFatherLoading', false); // 如果父组件中使用了loading效果，可调用此钩子函数关闭父组件loading效果
        page.render(renderContext);
        if (this.pages > num) {
          this.$_renderPage(num + 1);
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf_page {
  width: 100%;
  text-align: center;
}
</style>
