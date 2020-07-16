<template>
  <div class="index">
    <el-button @click="visibleDialog = !visibleDialog">按钮</el-button>
    <custom-dialog
      title="提示"
      :visible.sync="visibleDialog"
      @confirm="$_handleConfirm"
      @cancel="$_handleCancel"
      >这是一段内容</custom-dialog
    >
    <custom-btn @click="b">上一步</custom-btn>
    <custom-btn @click="a">下一步</custom-btn>
    <!-- ---------------插槽--------------- -->
    <oneroom>
      <template #todo="{ todo }">
        <span v-if="todo.isComplete">(OK)</span>
        {{ todo.text }}
      </template>
    </oneroom>
  </div>
</template>

<script>
import oneroom from './components/oneroom.vue';
export default {
  components: {
    oneroom
  },
  data() {
    return {
      visibleDialog: false,
      loading: false
    };
  },
  methods: {
    a() {
      console.log(123);
    },
    b() {
      this.loading = this.$cLoading({ text: '正在加载中...' });
      setTimeout(() => {
        this.loading.close();
      }, 3000);
    },
    $_handleConfirm() {
      this.visibleDialog = !this.visibleDialog;
    },
    $_handleCancel() {
      this.visibleDialog = !this.visibleDialog;
    }
  },
  pageVisible() {
    console.log('页面显示出来了');
  },
  pageHidden() {
    console.log('页面隐藏了');
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
  .btn + .btn {
    margin-left: 40px;
  }
}
</style>
