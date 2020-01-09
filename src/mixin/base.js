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

export {
  loadingMixin
};
