<template>
  <div class="home">
    <custom-btn @click.native="pdfBox = true">打开pdf</custom-btn>
    <pdf v-if="pdfBox" :pdfUrl="pdfUrl" @toFatherClosePdf="pdfBox = false"></pdf>
  </div>
</template>

<script>
import pdf from '@/components/pdf.vue';
export default {
  name: 'home',
  components: {
    customBtn,
    pdf
  },
  data() {
    return {
      pdfBox: false,
      pdfUrl: {
        url: 'http://xitianqujing.oss-cn-hangzhou.aliyuncs.com/8f1d3b29-7f2a-4afb-9f97-c6d1d37e23ee.pdf'
      }
    };
  },
  methods: {
  },
  created() {
  }
};
</script>

<style lang="scss" scoped>
</style>
