<!-- 此上传图片组件需要需要引入到目标组件中使用 -->
<!-- 例如"import uploadImg from '@/components/localComponents/uploadImg.vue'" -->
<!-- html中使用<uploadImg :info="info" v-on:toFatherUploadInfo="uploadInfo"></uploadImg>，info是传入的数据，详情见下 -->
<!-- 需要在父级使用uploadInfo()函数接收上传组件返回的信息，包括url -->
<template>
  <!-- 上传图片组件 -->
  <div class="uploadBox">
    <el-upload  action="customize"
                :http-request="uploadFile"
                class="avatar-uploader"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :style="uploadStyle">
      <img v-if="imageUrl" :src="imageUrl" class="avatar" :style="uploadStyle">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </el-upload>
  </div>
</template>

<script>
export default {
  /**
   * 从父组件获取的上传有关信息
   * @param {Object} info
   * {
   *    width: Number, 上传文件组件宽
   *    height: Number, 上传文件组件高
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
      uploadStyle: {}, // 组件宽高
      imageUrl: '' // 展示图片url
    };
  },
  created () {
    this.uploadStyle.width = this.info.width + 'px';
    this.uploadStyle.height = this.info.height + 'px';
    this.uploadStyle.lineHeight = this.info.height + 'px';
    this.uploadStyle.textAlign = 'center';
    console.log(this.uploadStyle);
  },
  methods: {
    // 上传前
    beforeAvatarUpload (file) {
      const isIMG = file.type === ('image/jpeg' || 'image/png');
      const isLt5M = file.size / 1024 / 1024 < 5;
      if (!isIMG) {
        this.$message.error('上传图片只能是 JPG、PNG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传图片大小不能超过 5MB!');
      }
      return isIMG && isLt5M;
    },
    // 生成随机文件名
    createRomdonFileName (params) {
      return this.uuid() + params.file.name.substring(params.file.name.lastIndexOf('.'));
    },
    uuid () {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        // eslint-disable-next-line one-var
        const r = Math.random() * 16 | 0,
          v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
    },
    // 文件上传
    uploadFile (params) {
      client.put(this.createRomdonFileName(params), params.file).then((r1) => {
        console.log('put success: %j', r1);
        this.$emit('toFatherUploadInfo', r1);
        this.imageUrl = r1.url;
        this.$message({
          message: '图片上传成功！',
          type: 'success'
        });
      }).then((r2) => {
        console.log('get success: %j', r2);
      }).catch((err) => {
        console.error('error: %j', err);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
    border-radius: 6px;
  }
</style>

<style lang="scss" scoped>
// 上传弹框
.uploadBox {
  // width: 100%;
  height: 100%;
  border: 1px dashed #ccc;
  border-radius: 6px;
  display: inline-block;
}
</style>
