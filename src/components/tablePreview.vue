<!-- 此表格内预览组件需要引入到目标表格中使用 -->
<!-- 例如"import tablePreview from '@/components/tablePreview.vue'" -->
<!-- 具体html中使用如下所示：
    <el-table-column
        label="预览"
        align="center"
        width="180">
        <template slot-scope="scope">
          <tablePreview :info="scope.row"></tablePreview>
        </template>
      </el-table-column> -->
<template>
  <div class="preview">
    <!-- 不可以预览时的图标 -->
    <i  class="iconfont iconyanjing iHidden"
        v-if="!info.uploadId"></i>
    <!-- 可以预览时的图标 -->
    <i class="iconfont iconyanjing iShow"
        v-if="info.uploadId"
        @click="preview(info)"></i>
    <!-- 预览img -->
    <previewImgInTable :img="imgs" v-if="previewImgBox" v-on:toFatherCloseImg="previewImgBox = false"></previewImgInTable>
    <!-- 预览pdf -->
    <pdf v-if="pdfBox" :pdfUrl="pdfUrl" v-on:toFatherClosePdf="pdfBox = false"></pdf>
  </div>
</template>

<script>
import { previewMixin } from '@/mixin/base.js';
import previewImgInTable from '@/components/previewImgInTable.vue'; // 表格内预览图片组件
import pdf from '@/components/pdf.vue'; // 预览pdf组件
export default {
  /**
  * 传入的info，是表格当前行所有信息
  * eg:
  * info: {
  *   uploadId: Number, // 文件上传id
  *   url: String, // 文件url
  * }
  */
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {
        return { message: 'hello' };
      }
    }
  },
  mixins: [previewMixin],
  components: {
    previewImgInTable,
    pdf
  },
  data () {
    return {
    };
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.preview {
  width: 100%;
  height: 100%;
  .iHidden {
    color: #999;
    cursor: default;
    font-size: 14px;
  }
  .iShow {
    color: #0089FF;
    cursor: pointer;
    font-size: 14px;
    &:hover {
      color: #007AE3;
    }
  }
}
</style>
