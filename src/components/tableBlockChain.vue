<!-- 此表格内上链信息组件需要引入到目标表格中使用 -->
<!-- 例如"import tableBlockChain from '@/components/tableBlockChain.vue'" -->
<!-- 具体html中使用如下所示：
    <el-table-column
        label="上链信息"
        align="center"
        width="180">
        <template slot-scope="scope">
          <tableBlockChain :info="scope.row"></tableBlockChain>
        </template>
      </el-table-column> -->
<template>
  <div class="blockChain">
    <!-- 不可以查看时的图标 -->
    <i  class="iconfont iconlink-fill iHidden"
        v-if="!info.uploadId"></i>
    <!-- 可以查看时的图标 -->
    <i class="iconfont iconlink-fill iShow"
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
.blockChain {
  width: 100%;
  height: 100%;
  .iHidden {
    color: #999;
    cursor: default;
    font-size: 24px;
  }
  .iShow {
    color: #0089FF;
    cursor: pointer;
    font-size: 24px;
    &:hover {
      color: #007AE3;
    }
  }
}
</style>
