<!-- 此表格内下载组件需要引入到目标表格中使用 -->
<!-- 例如"import tableDownload from '@/components/tableDownload.vue'" -->
<!-- 具体html中使用如下所示：
    <el-table-column
        label="下载"
        align="center"
        width="180">
        <template slot-scope="scope">
          <tableDownload :info="scope.row"></tableDownload>
        </template>
      </el-table-column> -->
<template>
  <div class="download">
    <!-- 不可以下载时的图标 -->
    <i  class="iconfont iconxiazai iHidden"
        v-if="!info.uploadId"></i>
    <!-- 可以下载时的图标 -->
    <i class="iconfont iconxiazai iShow"
        v-if="info.uploadId"
        @click="download(info)"></i>
  </div>
</template>

<script>
export default {
  /**
  * 传入的info，是表格当前行所有信息
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
  },
  data () {
    return {
    };
  },
  methods: {
    download (info) {
    }
  },
  created () {
  }
};
</script>

<style lang="scss" scoped>
.download {
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
