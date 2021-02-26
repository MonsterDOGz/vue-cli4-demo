<!-- 房源上传 -->
<template>
  <el-dialog
    title="房源上传"
    :visible.sync="outerVisible"
    :close-on-click-modal="false"
    :modal-append-to-body="false"
    @close="$_closeDialog"
    class="evaluation-negotiation-dialog"
    width="607px"
  >
    <el-form ref="saleCardNumber" :model="formData" :rules="rules" class="dialog__form">
      <span>预售证号</span>
      <el-form-item prop="saleCardNumber">
        <el-input
          placeholder="请输入"
          v-model="formData.saleCardNumber"
          class="dialog__input"
          @input="$_inputBlur('saleCardNumber')"
        />
      </el-form-item>
    </el-form>
    <span>文件上传</span>
    <drag-upload ref="dragUpload" :upload-info="dialogInfo" @to-father-info="$_toFatherInfo" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="$_closeDialog">取 消</el-button>
      <el-button type="primary" :loading="buttonLoading" @click="$_commitBtn">提 交</el-button>
    </div>
  </el-dialog>
</template>

<script>
import DragUpload from '@/components/localComponents/DragUpload.vue';
export default {
  props: {
    dialogInfo: Object,
    buttonLoading: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    DragUpload
  },
  data() {
    // 预售证号校验规则
    const saleCardNumberRules = (rule, value, callback) => {
      const reg = this.$regular.saleCardNumberRules;
      if (!value) {
        return callback(new Error('请输入预售证号'));
      } else if (!reg.test(value)) {
        return callback(new Error('请输入正确格式的预售证号'));
      } else {
        callback();
      }
    };
    return {
      outerVisible: true, // 是否显示整个组件
      formData: {
        saleCardNumber: '' // 预售证号
      },
      rules: {
        // 预售证号校验规则
        saleCardNumber: [{ validator: saleCardNumberRules, trigger: ['blur', 'change'] }]
      }
    };
  },
  methods: {
    // 验证预售证号
    $_inputBlur(form) {
      let res;
      this.$refs[form].validate(valid => {
        if (valid) {
          res = true;
        } else {
          res = false;
        }
      });
      return res;
    },
    $_closeDialog() {
      this.$emit('close-dialog');
    },
    $_commitBtn() {
      const res = this.$_inputBlur('saleCardNumber');
      if (res) {
        this.$refs.dragUpload.submitFile();
      }
    },
    $_toFatherInfo(value) {
      const res = {
        advanceNumber: this.formData.saleCardNumber,
        fileId: value.data[0].fileId
      };
      this.$emit('to-father-upload', res);
    }
  }
};
</script>

<style lang="scss">
// 账户验证弹框
.evaluation-negotiation-dialog {
  .dialog__form {
    padding-bottom: 0px;

    .dialog__input {
      width: 250px;
    }
  }

  >>> .el-dialog__body {
    padding: 10px 20px 20px;
  }

  >>> .el-upload-dragger {
    width: 567px;
  }
}
</style>
