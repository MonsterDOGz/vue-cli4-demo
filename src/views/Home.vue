<!--
 * @Author: MonsterDOG
 * @Date: 2020-11-25 17:53:45
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-01 11:41:30
 * @FilePath: /vue-cli4-demo/src/views/Home.vue
 * @Description: 【描述】
-->
<template>
  <div class="home">
    <app-btn @click.native="pdfBox = true">打开pdf</app-btn>
    <app-pdf v-if="pdfBox" :pdf-url="pdfUrl" @toFatherClosePdf="pdfBox = false" />
    <app-btn @click.native="$refs.previewImg.$_show()">打开图片</app-btn>
    <app-btn @click.native="$router.push({ path: '/echarts' })">open echarts</app-btn>
  </div>
</template>

<script>
import AppPdf from '@/components/AppPdf';
import AppBtn from '../components/globalComponents/AppBtn.vue';
export default {
  name: 'home',
  components: {
    AppPdf,
    AppBtn
  },
  data() {
    return {
      pdfBox: false,
      pdfUrl: {
        url:
          'http://xitianqujing.oss-cn-hangzhou.aliyuncs.com/8f1d3b29-7f2a-4afb-9f97-c6d1d37e23ee.pdf'
      }
    };
  }
};
</script>

<style lang="scss" scoped></style>
