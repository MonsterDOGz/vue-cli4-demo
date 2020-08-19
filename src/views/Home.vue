<template>
  <div class="home">
    <app-btn @click.native="pdfBox = true">打开pdf</app-btn>
    <app-pdf v-if="pdfBox" :pdf-url="pdfUrl" @toFatherClosePdf="pdfBox = false" />
  </div>
</template>

<script>
import AppPdf from '@/components/AppPdf';
export default {
  name: 'home',
  components: {
    AppPdf
  },
  data() {
    return {
      pdfBox: false,
      pdfUrl: {
        url:
          'http://xitianqujing.oss-cn-hangzhou.aliyuncs.com/8f1d3b29-7f2a-4afb-9f97-c6d1d37e23ee.pdf'
      }
    };
  },
  methods: {},
  created() {}
};
</script>

<style lang="scss" scoped></style>
