<template>
  <!---使用了v-bind与v-on监听属性与事件-->
  <el-dialog :visible.sync="visibleDialog" v-bind="$props" v-on="$listeners">
    <!--内容区域的默认插槽-->
    <slot></slot>
    <!--使用弹框的footer插槽添加按钮-->
    <template #footer>
      <!--对外继续暴露footer插槽，有个别弹框按钮需要自定义-->
      <slot name="footer">
        <!--将取消与确定按钮集成到内部-->
        <span>
          <el-button type="primary" @click="$_handleConfirm">确 定</el-button>
          <el-button @click="$_handleCancel">取 消</el-button>
        </span>
      </slot>
    </template>
  </el-dialog>
</template>

<script>
import { Dialog } from 'element-ui';
export default {
  // 默认情况下父作用域的不被认作 props 的 attribute 绑定 (attribute bindings)
  // 将会“回退”且作为普通的 HTML attribute 应用在子组件的根元素上。
  // 通过设置 inheritAttrs 到 false，这些默认行为将会被去掉
  inheritAttrs: false,
  props: {
    // 对外暴露visible属性，用于显示隐藏弹框
    visible: {
      type: Boolean,
      default: false
    },
    // 将Dialog的props通过扩展运算符展开到props属性里面
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
  methods: {
    // 对外抛出cancel事件
    $_handleCancel() {
      this.$emit('cancel');
    },
    // 对外抛出confirm事件
    $_handleConfirm() {
      this.$emit('confirm');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
