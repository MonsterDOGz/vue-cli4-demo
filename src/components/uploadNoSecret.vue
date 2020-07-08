<template>
  <!-- 上传组件 -->
  <div class="uploadBox">
    <!-- 外层上传框 -->
    <el-dialog title="文件上传"
               :visible.sync="outerVisible"
               :close-on-click-modal="false"
               :show-close="false"
               width="666px">
      <p style="text-align:center;margin-bottom: 20px">需上传文件：{{info.name}}</p>
      <el-upload ref="upload"
                 class="upload-demo"
                 drag
                 action="customize"
                 :http-request="uploadFile"
                 :auto-upload="false"
                 :limit="1"
                 :accept="fileType"
                 show-file-list
                 :on-change="file"
                 style="text-align:center;width:630px">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip"
             slot="tip">只能上传{{fileType}}文件</div>
      </el-upload>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="uploadIsOver">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  /**
   * 从父组件获取的上传有关信息
   * @param {Object} info
   * {
   *    name: String, 上传文件名称
   *    dirtPatApplyForId: Number, 申请表id
   *    fileType: String 上传文件类型限制
   * }
   */
  props: {
    info: {
      type: Object,
      required: true,
      default: () => {
        return { message: 'error' };
      }
    }
  },
  data () {
    return {
      uploadSuc: false,
      outerVisible: true, // 外层
      fileType: '' // 文件类型限制
    };
  },
  created () {
    this.changeFileType();
  },
  methods: {
    // 判断上传文件类型
    changeFileType () {
      if (this.info.fileType) {
        this.fileType = this.info.fileType;
      } else {
        this.fileType = '.pdf,.jpg,.png,.zip,.xlsx';
      }
      console.log(this.fileType);
    },
    file () {
      this.uploadSuc = true;
    },
    // 上传关闭、取消按钮
    uploadIsOver () {
      this.$emit('toFatherUpload');
    },
    // 确认上传
    submit () {
      if (this.uploadSuc === true) {
        this.$refs.upload.submit();
      } else {
        this.$message({
          message: '请先上传文件！',
          type: 'warning'
        });
      }
    },
    // 文件上传
    uploadFile (params) {
      this.openFullScreen(); // loading
      // console.log('uploadFile', params)
      // console.log(this.info)
      // console.log(this.info.dirtPatApplyForId)
      var formData = new FormData();
      formData.append('file', params.file);
      // formData.append('userId', this.$store.state.userInfo.userId);
      // console.log(params, 'formData')
      // formData.append('dirtPatApplyForId', this.info.dirtPatApplyForId)
      this.$api.baseApi.apiUpload(formData).then(res => {
        this.loading.close();
        // console.log(res)
        if (res.data.meta.code === 200) {
          this.$emit('toFatherUpload', res.data.data[0], this.info, params); // 调用上传接口二业务接口
        }
      });
    },
    // loading效果
    openFullScreen () {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  }
};
</script>

<style lang="scss" scoped>
// 上传弹框
.uploadBox {
  width: 100%;
  height: 100%;
}
</style>
