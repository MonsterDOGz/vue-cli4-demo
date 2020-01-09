<template>
  <div class="pdf">
    <div class="pdfBox">
      <canvas
        v-for="page in pages"
        :id="'the-canvas' + page"
        :key="page"
      ></canvas>
    </div>
    <div class="previewClose"
         @click="open">
      <i class="iconfont iconquxiao"></i>
    </div>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
export default {
  props: {
    pdfUrl: {
      type: String,
      required: true,
      default: () => {
        return { message: 'hello' };
      }
    }
  },
  data () {
    return {
      pages: [],
      pdfDoc: ''
    };
  },
  methods: {
    open () {
      this.$emit('toFatherClosePdf');
    },
    _renderPage (num) {
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
        let viewport = page.getViewport(900 / page.getViewport(1).width);
        console.log(viewport);
        // let viewport = page.getViewport(
        //   parseInt(this.pdfInPageInfo.pdfWidth) / page.getViewport(1).width
        // );
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
    _loadFile (url) {
      PDFJS.getDocument(url).then(pdf => {
        this.pdfDoc = pdf;
        console.log(pdf);
        this.pages = this.pdfDoc.numPages;
        this.$nextTick(() => {
          this._renderPage(1);
        });
      });
    }
  },
  created () {
    this._loadFile(this.pdfUrl);
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
    // margin: 0 auto;
    // margin-top: 5%;
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
    i {
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
