<template>
  <div class="index">
    <el-button @click="visibleDialog = !visibleDialog">按钮</el-button>
    <custom-dialog title="提示" :visible.sync="visibleDialog" @confirm="$_handleConfirm" @cancel="$_handleCancel">这是一段内容</custom-dialog>
  </div>
</template>

<script>
import customDialog from './customDialog.vue';
export default {
  components: {
    customDialog
  },
  data () {
    return {
      visibleDialog: false
    };
  },
  methods: {
    $_handleConfirm () {
      this.visibleDialog = !this.visibleDialog;
    },
    $_handleCancel () {
      this.visibleDialog = !this.visibleDialog;
    }
  }
};
</script>

<style lang="scss" scoped>
.index {
  width: 100%;
}
</style>
