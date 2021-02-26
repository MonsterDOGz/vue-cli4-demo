<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 16:13:13
  * @Description: 拖拽上传 模块
-->
<template>
  <div class="dialog-upload">
    <el-upload
      ref="upload"
      drag
      action="customize"
      :http-request="$_judgeExpired"
      :auto-upload="isAutoUpload"
      :limit="fileNumber"
      :accept="fileType"
      show-file-list
      :on-change="$_changeFile"
      :on-exceed="$_exceedFile"
      :on-remove="$_removeFile"
      style="text-align: center"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        只能上传{{ fileType }}文件
        <span v-show="fileNumber !== 1">，最多上传{{ fileNumber }}个文件</span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import { Base64 } from 'js-base64';
const type = ['pdf', 'jpg', 'jpeg', 'png', 'zip', 'rar', 'doc', 'docx', 'xlsx']; // 目前考虑到的所有文件类型
export default {
  /**
   * uploadInfo: {
   *  fileType: String, // 可以上传的文件类型
   *  fileNumber: Number, // 最多上传的文件数量
   *  fileLogId: Number, // 文件主键id
   *  needSave: Boolean, // 是否需要保存关联信息
   *  canEmpty: Boolean,// 是否可以一个文件都不上传
   *  autoUpload: Boolean // 自动上传 默认为false
   * }
   */
  props: {
    // 上传相关信息，可不传
    uploadInfo: {
      type: Object,
      required: false,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      signatureInfo: {}, // 签名信息
      currentFileNumber: 0, // 当前已选择的文件个数
      loading: '', // 加载中
      allUploadInfo: [] // 上传oss成功后的多条数据，用来返回给父组件
    };
  },
  computed: {
    // 文件类型限制
    fileType() {
      const { uploadInfo } = this;
      if (uploadInfo.fileType) {
        return uploadInfo.fileType;
      }
      return '.pdf,.jpg,.png,.zip,.doc';
    },
    // 文件数量限制
    fileNumber() {
      const { uploadInfo } = this;
      if (uploadInfo.fileNumber) {
        return uploadInfo.fileNumber;
      }
      return 1;
    },
    // 文件是否需要保存关联信息
    fileNeedSave() {
      const { uploadInfo } = this;
      if (typeof uploadInfo.needSave === 'boolean') {
        return uploadInfo.needSave;
      } else {
        return true;
      }
    },
    // 是否自动上传
    isAutoUpload() {
      const { uploadInfo } = this;
      if (uploadInfo.autoUpload) {
        return true;
      }
      return false;
    }
  },
  async created() {
    this.signatureInfo = await this.$_getSignature();
  },
  methods: {
    // 获取签名信息
    async $_getSignature() {
      try {
        const res = await this.$api.baseApi.apiGetPolicy(this.fileNeedSave);
        const { data } = res.data;
        return Object.assign(
          {},
          {
            accessid: data.accessid, // oss用户ID
            policyBase64: data.policy, // 上传策略
            signature: data.signature, // 签名
            key: data.dir, // oss上传文件夹目录
            host: data.host, // 文件上传地址
            expire: data.expire, // 有效期
            callbackbody: data.callback // 回调参数
          }
        );
      } catch (error) {
        console.log(error);
      }
    },
    // 选择了文件时触发的函数，判断文件大小
    $_changeFile(file, fileList) {
      const { fileType } = this;
      const testmsg = file.name.substring(file.name.lastIndexOf('.') + 1);
      const isLt20M = file.size / 1024 / 1024 < 20; // 不超过20MB
      const isLt200M = file.size / 1024 / 1024 < 200; // 不超过200MB
      // ------------判断选择的文件格式是否符合规则
      if (
        !type.some(item => {
          return fileType.includes(item) && testmsg === item;
        })
      ) {
        fileList.pop();
        this.$message(`上传文件只能是${fileType}格式!`);
      }
      // ------------判断zip、rar压缩文件的大小不能超过200MB，一般文件的大小不能超过200MB
      const extension1 = fileType.includes('zip') && testmsg === 'zip';
      const extension2 = fileType.includes('rar') && testmsg === 'rar';
      if ((extension1 || extension2) && !isLt200M) {
        fileList.pop();
        this.$message.warning('上传的压缩文件大小不能超过 200MB!');
      } else if (!isLt20M) {
        fileList.pop();
        this.$message.warning('上传文件大小不能超过 20MB!');
      }
      this.currentFileNumber = fileList.length; // 保存当前已选择的文件个数
    },
    // 文件超出个数
    $_exceedFile() {
      this.$message.warning(
        `只能选择${this.fileNumber}个上传文件！若想继续选择，请先删除已选择的文件。`
      );
    },
    // 移除文件时获取文件列表数
    $_removeFile(file, fileList) {
      this.currentFileNumber = fileList.length; // 保存当前已选择的文件个数
    },
    // 确认上传
    submitFile() {
      const { uploadInfo, currentFileNumber } = this;
      if (uploadInfo.canEmpty && currentFileNumber === 0) {
        this.$emit('to-father-info', { data: [], info: uploadInfo });
      } else if (currentFileNumber) {
        this.allUploadInfo = [];
        this.$refs.upload.submit();
      } else {
        this.$message.warning('请先选择上传的文件！');
      }
    },
    // 判断签名是否过期
    async $_judgeExpired(params) {
      const { expire } = this.signatureInfo;
      const now = Date.parse(new Date()) / 1000;
      if (expire && expire < now + 3) {
        this.signatureInfo = await this.$_getSignature();
      }
      this.$_uploadFile(params, this.signatureInfo);
    },
    // 上传接口
    $_uploadFile(params, signatureInfo) {
      const signInfo = signatureInfo;
      const { uploadInfo, currentFileNumber } = this;
      // 回调中加入文件名称、文件主键id
      if (uploadInfo.fileLogId) {
        signInfo.callbackbody.callbackBody = `filename=${params.file.name}&
          fileLogId=${uploadInfo.fileLogId}&
          pwd= &${signInfo.callbackbody.callbackBody}`;
      } else {
        signInfo.callbackbody.callbackBody = `filename=${params.file.name}&
          pwd= &${signInfo.callbackbody.callbackBody}`;
      }
      this.$_openFullScreen(); // loading
      var newMultipartParams = new FormData();
      newMultipartParams.append('key', signInfo.key + this.$_createRomdonFileName(params));
      newMultipartParams.append('policy', signInfo.policyBase64);
      newMultipartParams.append('OSSAccessKeyId', signInfo.accessid);
      newMultipartParams.append('success_action_status', '200');
      newMultipartParams.append('callback', Base64.encode(JSON.stringify(signInfo.callbackbody)));
      newMultipartParams.append('signature', signInfo.signature);
      newMultipartParams.append('file', params.file);
      this.axios.post(signInfo.host, newMultipartParams).then(res => {
        const { data } = res;
        if (data.code === 200) {
          this.allUploadInfo.push(data.data);
          if (currentFileNumber === this.allUploadInfo.length) {
            this.loading.close();
            this.$emit('to-father-info', {
              data: this.allUploadInfo,
              info: uploadInfo
            });
            this.$message({
              message: '上传成功！',
              type: 'success'
            });
          }
        } else {
          this.loading.close();
          this.$message.error(data.msg);
        }
      });
    },
    // 随机文件名
    $_uuid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    },
    // 生成 文件名+文件后缀
    $_createRomdonFileName(params) {
      const { name } = params.file;
      return this.$_uuid() + name.substring(name.lastIndexOf('.'));
    },
    // loading效果
    $_openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: '拼命加载中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      this.$once('hook:beforeDestroy', () => {
        this.loading.close();
      });
    }
  }
};
</script>

<style lang="scss" scoped>
>>> .el-upload-list {
  margin-top: 10px;
  max-height: 100px;
  overflow-y: scroll;
}

>>> .el-upload-list__item {
  .el-icon-close {
    right: 15px;
  }
}
</style>
