<!--
 * @Author: MonsterDOG
 * @Date: 2020-11-25 17:53:45
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 20:09:09
 * @FilePath: /vue-cli4-demo/src/views/Home.vue
 * @Description: 【描述】
-->
<template>
  <div class="home">
    <app-btn @click="pdfBox = true">预览pdf</app-btn>
    <app-btn @click="$refs.previewImg.$_show()">预览图片</app-btn>
    <app-btn @click="uploadBox = true">打开上传</app-btn>
    <app-btn @click="signContractBox = true">签章</app-btn>

    <app-pdf v-if="pdfBox" :pdf-info="pdfInfo" @toFatherClosePdf="pdfBox = false" />
    <preview-img ref="previewImg" :images="images" />
    <upload-dialog v-if="uploadBox" :dialog-info="dialogInfo" :button-loading="buttonLoading" />
    <sign-contract v-if="signContractBox" :info="signInfo" />
  </div>
</template>

<script>
import AppBtn from '../components/globalComponents/AppBtn.vue';
import AppPdf from '@/components/AppPdf';
import UploadDialog from '@/components/UploadDialog';
import previewImg from '@/components/previewImg';
import signContract from '@/components/signContract';
export default {
  name: 'home',
  components: {
    AppPdf,
    AppBtn,
    UploadDialog,
    previewImg,
    signContract
  },
  data() {
    return {
      pdfBox: false,
      pdfInfo: {
        url:
          'http://xitianqujing.oss-cn-hangzhou.aliyuncs.com/8f1d3b29-7f2a-4afb-9f97-c6d1d37e23ee.pdf'
      },
      previewBox: false,
      images: [
        {
          url:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg'
        }
      ],
      uploadBox: false,
      dialogInfo: {},
      buttonLoading: false,
      signContractBox: false,
      signInfo: [
        {
          name: '文件1',
          uploadId: 1,
          isEncryption: false,
          isCanSign: true
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}
</style>
