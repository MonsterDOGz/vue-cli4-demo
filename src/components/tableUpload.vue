<!-- 此表格内上传组件需要引入到目标表格中使用 -->
<!-- 例如"import tableUpload from '@/components/tableUpload.vue'" -->
<!-- 具体html中使用如下所示：
    <el-table-column
      label="上传"
      align="center"
      width="180">
      <template slot-scope="scope">
        <tableUpload :info="scope.row"></tableUpload>
      </template>
    </el-table-column> -->
<template>
  <div class="upload">
    <!-- 不需要上传时的图标 -->
    <i  class="iconfont iconshangchuan iHidden"
        v-if="!info.isCanUpload"></i>
    <!-- 需要上传时的图标 -->
    <i class="iconfont iconshangchuan iShow"
        v-if="info.isCanUpload"
        @click="upload(info)"></i>
    <!-- 加密上传附件弹框 -->
    <upload v-if="uploadBtn"
            :info="nowUploadInfo"
            v-on:toFatherUpload="uploadBtn = false"></upload>
    <!-- 不加密上传附件弹框 -->
    <uploadNoSecret v-if="noSecretUploadBtn"
                    :info="nowUploadInfo"
                    v-on:toFatherUpload="noSecretUploadBtn = false"></uploadNoSecret>
  </div>
</template>

<script>
import upload from '@/components/upload.vue'; // 加密上传附件弹框
import uploadNoSecret from '@/components/uploadNoSecret.vue'; // 不加密上传附件弹框
export default {
  /**
  * 传入的info，是表格当前行所有信息，必须包含以下字段
  * eg:
  * info: {
  *   isCanUpload: Boolean, // 是否可以上传
  *   name: String, // 文件名
  *   fileType: String // 上传文件类型限制
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
  components: {
    upload,
    uploadNoSecret
  },
  data () {
    return {
      uploadBtn: false, // 加密上传弹框显示隐藏
      noSecretUploadBtn: false, // 不加密上传弹框显示隐藏
      nowUploadInfo: '' // 传给两个上传组件的参数
    };
  },
  methods: {
    upload (info) {
      this.nowUploadInfo = info;
      // isNeedSecret是文件是否需要加密的意思
      if (info.isNeedSecret) {
        this.uploadBtn = true;
      } else if (!info.isNeedSecret) {
        this.noSecretUploadBtn = true;
      }
    }
  },
  created () {
  }
};
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
  height: 100%;
  .iHidden {
    color: #999;
    cursor: default;
    font-size: 20px;
  }
  .iShow {
    color: #0089FF;
    cursor: pointer;
    font-size: 20px;
    &:hover {
      color: #007AE3;
    }
  }
}
</style>
