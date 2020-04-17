// 混入使用方法
// 先在对应组件中 import { loadingMixin, previewMixin } from '@/common/mixin/base.js'
// 组件export default中 mixins: [loadingMixin, previewMixin]

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
      previewImgBox: false, // 预览图片组件显示隐藏
      imgs: {}, // 传入的图片文件对象
      pdfUrl: {}, // 传入的pdf文件对象
      pdfBox: false // pdf预览框的显示隐藏
    };
  },
  methods: {
    // 同时预览img或者pdf时调用，picOrPdf是当前对象的所有信息，必须包含url
    preview (picOrPdf) {
      console.log(picOrPdf);
      const suffix = picOrPdf.url.substr(-3, 3);
      if ((suffix === 'jpg') || (suffix === 'png')) {
        this.previewImgBox = false;
        this.imgs = picOrPdf;
        this.previewImgBox = true;
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

// ------------------------------复制文本到剪切板------------------------------
// template模版中加入  <input id="input" class="hiddenInput">
// style样式中加入：
// .hiddenInput
//   position absolute
//   z-index -1000
//   opacity 0
const copyText = {
  data () {
    return {};
  },
  methods: {
    copyText (val) {
      var text = val;
      var input = document.getElementById('input'); // 获取隐藏input的dom
      input.value = text; // 修改文本框的内容
      input.select(); // 选中文本
      document.execCommand('copy'); // 执行浏览器复制命令
      this.$message.success({
        message: '复制成功'
      });
    }
  }
};

export {
  loadingMixin,
  previewMixin,
  copyText
};
