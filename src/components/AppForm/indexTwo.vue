<script>
export default {
  functional: true,
  name: 'DynFormItemsFunction',
  props: {
    formItemConfigArr: {
      type: Array,
      required: true
    }
  },
  render(h, context) {
    // console.log(context);
    const { props, scopedSlots } = context;
    const { formItemConfigArr } = props;
    // 获得插槽里的 vNodes
    const vNodes = scopedSlots.default();
    return vNodes.map((node, idx) => {
      const formItemConfig = formItemConfigArr[idx];
      return (
        <el-form-item prop={formItemConfig.prop} rules={formItemConfig.rules}>
          <span slot="label" className="o-custom-label">
            {formItemConfig.label}
          </span>
          {node}
        </el-form-item>
      );
    });
  }
};
</script>

<style scoped>
.o-custom-label {
  color: blue;
}
</style>
