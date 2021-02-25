<!-- 此预览pdf组件需要需要引入到目标组件中使用 -->
<!-- 例如"import previewImg from '@/components/pdf.vue'" -->
<!-- html中使用<pdf v-if="pdfBox" :pdfUrl="pdfUrl" v-on:toFatherClosePdf="pdfBox = false"></pdf>，url是传入的数据，详情见下 -->
<template>
  <div class="pdf">
    <div class="pdfBox">
      <canvas v-for="page in pages" :id="'the-canvas' + page" :key="page"></canvas>
    </div>
    <div class="previewClose" @click="open">
      <i class="iconfont iconquxiao close"></i>
    </div>
  </div>
</template>

<script>
import pdfjsLib from 'pdfjs-dist';
var CMAP_URL = 'https://unpkg.com/pdfjs-dist@2.0.943/cmaps/';
// pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
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
        return { message: 'hello' };
      }
    }
  },
  data() {
    return {
      pages: [],
      pdfDoc: ''
    };
  },
  methods: {
    open() {
      this.$emit('toFatherClosePdf');
    },
    _renderPage(num) {
      this.pdfDoc.getPage(num).then(page => {
        let canvas = document.getElementById('the-canvas' + num);
        let ctx = canvas.getContext('2d');
        let dpr = window.devicePixelRatio || 1;
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1;
        let ratio = dpr / bsr;
        let viewport = page.getViewport({
          scale: 900 / page.getViewport({ scale: 1 }).width
        });
        canvas.width = viewport.width * ratio;
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + 'px';
        canvas.style.height = viewport.height + 'px';
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        let renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        if (this.pages > num) {
          this._renderPage(num + 1);
        }
        this.$emit('toFather');
      });
    },
    _loadFile(url) {
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
          this._renderPage(1);
        });
      });
    }
  },
  created() {
    this._loadFile(this.pdfUrl.url);
  }
};
</script>

<style lang="scss" scoped>
.pdf {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  .pdfBox {
    width: 900px;
    height: 90vh;
    overflow-y: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .previewClose {
    background-color: rgba(0, 0, 0, 0.3);
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    top: -80px;
    right: -80px;
    cursor: pointer;
    transition: 0.2s;
    .close {
      line-height: 50px;
      font-size: 50px;
      position: absolute;
      top: 55%;
      left: 15%;
      color: #fff;
    }
  }
  .previewClose:hover {
    background-color: rgba(0, 0, 0, 0.7);
  }
}
</style>
