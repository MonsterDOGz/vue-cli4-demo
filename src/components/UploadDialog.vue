<!--
 * @Author: MonsterDOG
 * @Date: 2021-03-11 14:10:14
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-06-15 15:02:14
 * @FilePath: \vue-cli4-demo\src\components\UploadDialog.vue
 * @Description: 【描述】上传
-->
<template>
  <el-dialog
    title="上传"
    :visible.sync="outerVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @close="$_closeDialog"
    class="upload-dialog"
    width="607px"
  >
    <drag-upload ref="dragUpload" :upload-info="dialogInfo" @to-father-info="$_toFatherInfo" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="$_closeDialog">取 消</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="$_commitBtn">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import DragUpload from './DragUpload.vue';
export default {
  props: {
    dialogInfo: Object,
    buttonLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    DragUpload
  },
  data() {
    return {
      outerVisible: false // 是否显示整个组件
    };
  },
  created() {
    setTimeout(() => {
      this.outerVisible = true;
    }, 3000);
  },
  methods: {
    $_closeDialog() {
      this.$emit('close-dialog');
    },
    $_commitBtn() {
      this.$refs.dragUpload.submitFile();
    },
    $_toFatherInfo(value) {
      const res = {
        fileId: value.data[0].fileId
      };
      this.$emit('to-father-upload', res);
    }
  }
};
</script>

<style lang="scss">
.upload-dialog {
  >>> .el-dialog__body {
    padding: 10px 20px 20px;
  }
  .el-dialog__footer {
    text-align: center;
  }

  >>> .el-upload-dragger {
    width: 567px;
  }
}
</style>
