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
                   @click="goSecret()"
                   v-show="secretOver === false">加 密</el-button>
        <el-button type="primary"
                   v-show="secretOver === true"
                   @click="submit">确 定</el-button>
      </div>
      <!-- 内层加密框 -->
      <el-dialog width="30%"
                 title="加密"
                 :visible.sync="innerVisible"
                 append-to-body>
        <p style="margin-bottom:20px">加密口令：<el-input style="margin-top:10px"
                    placeholder="请输入加密口令"
                    v-model="input.one"
                    show-password
                    @blur="verifyOne"></el-input>
        </p>
        <p>再次输入：<el-input style="margin-top:10px"
                    placeholder="请再次输入加密口令"
                    v-model="input.two"
                    show-password
                    @blur="verifyTwo"></el-input>
        </p>
        <div slot="footer"
             class="dialog-footer">
          <el-button type="primary"
                     @click="secret">确 定</el-button>
        </div>
      </el-dialog>
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
   *    dirtPatApplyForId: Number, 申请表id（此字段待商议，可能不需要）
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
      outerVisible: true, // 外层
      innerVisible: false, // 内层
      secretOver: false, // 是否加密
      input: {
        one: '',
        two: ''
      },
      uploadSuc: false,
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
    // 上传关闭、取消按钮
    uploadIsOver () {
      this.$emit('toFatherUpload');
    },
    file () {
      this.uploadSuc = true;
    },
    goSecret () {
      if (this.uploadSuc === true) {
        this.innerVisible = true;
      } else {
        this.$message({
          message: '请先上传文件！',
          type: 'warning'
        });
      }
    },
    // 验证密码
    verifyOne () {
      if (this.input.one !== '123456') {
        this.$message.error('您输入的密码错误！');
        this.input.one = '';
      }
    },
    verifyTwo () {
      if (this.input.two !== '123456') {
        this.$message.error('您输入的密码错误！');
        this.input.two = '';
      }
    },
    // 加密
    secret () {
      if (this.input.one === '123456' && this.input.two === '123456') {
        this.innerVisible = false;
        this.secretOver = true;
        this.$message({
          message: '加密成功',
          type: 'success'
        });
      } else {
        this.$message.error('您输入的密码错误！');
      }
    },
    // 确认上传
    submit () {
      this.$refs.upload.submit();
    },
    // 文件上传
    uploadFile (params) {
      this.openFullScreen(); // loading
      console.log('uploadFile', params);
      console.log(this.info);
      var formData = new FormData();
      formData.append('file', params.file);
      formData.append('userId', this.$store.state.userInfo.userId);
      // formData.append('dirtPatApplyForId', this.info.dirtPatApplyForId)
      formData.append('password', this.input.one);
      this.$api.baseApi.apiUpload(formData).then(res => {
        this.loading.close();
        console.log(res);
        if (res.data.meta.code === 200) {
          this.$emit('toFatherUpload', res.data.data[0], this.info); // 调用上传接口二业务接口
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
