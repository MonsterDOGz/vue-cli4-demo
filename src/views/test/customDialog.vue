<template>
  <el-dialog :visible.sync="visibleDialog" v-bind="$props" v-on:="$listeners">
    <slot></slot>
    <template #footer>
      <slot name="footer">
        <span>
          <el-button @click="$_handleCancel">取 消</el-button>
          <el-button type="primary" @click="$_handleConfirm">
            确 定
          </el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui';
export default {
  inheritAttrs: false,
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    ...Dialog.props
  },
  computed: {
    // 通过计算属性，对.sync进行转换，外部也可以直接使用visible.sync
    visibleDialog: {
      get() {
        return this.visible;
      },
      set(val) {
        this.$emit('update:visible', val);
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    // 对外抛出cancel事件
    $_handleCancel() {
      this.$emit('cancel');
    },
    // 对外抛出 confirm事件
    $_handleConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="scss" scoped>
>>>.el-dialog__wrapper .el-dialog .el-dialog__footer {
  text-align: right !important;
}
</style>
