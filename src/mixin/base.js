// -----------------------------全屏loading方法混入-------------------------
// 使用this.openFullScreen(loadingTip)方法调用，loadingTip是传入的提示文本
// 使用this.loading.close()方法关闭
const loadingMixin = {
  data () {
    return {
      loading: '' // loading实例
    };
  },
  methods: {
    // loading效果
    openFullScreen (loadingTip) {
      this.loading = this.$loading({
        lock: true,
        text: loadingTip,
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  }
};

// -----------------------------img/pdf预览方法混入-------------------------
const previewMixin = {
  data () {
    return {
      imgs: {}, // 传入的图片文件对象
      pdfUrl: {}, // 传入的pdf文件对象
      pdfBox: false // pdf预览框的显示隐藏
    };
  },
  methods: {
    // 同时预览img或者pdf时调用，picOrPdf是当前对象的所有信息，必须包含url
    preview (picOrPdf) {
      console.log(picOrPdf);
      let suffix = picOrPdf.url.substr(-3, 3);
      if ((suffix === 'jpg') || (suffix === 'png')) {
        this.imgs = picOrPdf;
        this.$refs.comView.show();
      } else if (suffix === 'pdf') {
        this.pdfUrl = picOrPdf;
        this.pdfBox = true;
      }
      console.log(this.pdfUrl);
    },
    // 只是预览img时调用
    previewImg () {
      this.$refs.comView.show();
    },
    // 只是预览pdf时调用
    previewPdf () {
      this.pdfBox = true;
    }
  }
};

export {
  loadingMixin,
  previewMixin
};
