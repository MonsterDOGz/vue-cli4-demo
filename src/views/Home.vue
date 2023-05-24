<!--
 * @Author: MonsterDOG
 * @Date: 2020-11-25 17:53:45
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2023-04-27 14:13:51
 * @FilePath: \vue-cli4-demo\src\views\Home.vue
 * @Description: 【描述】
-->
<template>
  <div class="home">
    <app-btn @click="pdfBox = true">预览pdf</app-btn>
    <app-btn @click="$refs.previewImg.$_show()">预览图片</app-btn>
    <app-btn @click="uploadBox = true">打开上传</app-btn>
    <app-btn @click="signContractBox = true">签章</app-btn>

    <app-pdf v-if="pdfBox" :pdf-info="pdfInfo" @toFatherClosePdf="pdfBox = false" />
    <preview-img ref="previewImg" :images="images" />
    <upload-dialog
      v-if="uploadBox"
      :dialog-info="dialogInfo"
      :button-loading="buttonLoading"
      @close-dialog="uploadBox = false"
    />
    <sign-contract
      v-if="signContractBox"
      :info="signInfo"
      @to-father-close="closeSignContractBox"
    />
    <div class="demo-form">
      <h3>表单</h3>
      <AppFormOne
       v-if="false"
        v-model="formData"
        :form-item-config-arr="formItemConfigArr"
        :el-form-attrs="elFormAttrs"
      ></AppFormOne>
      <el-form :model="formData" inline :validate-on-rule-change="false">
        <!-- AppFormTwo 这个组件，仅封装了el-form-item的逻辑 -->
        <AppFormTwo :form-item-config-arr="formItemConfigArrComp">
          <!-- 注意组件的循环是在slot中进行的，el-form-item的包装逻辑，
          交给了AppFormTwo组件实现 -->
          <template v-for="(formItemConfig, idx) in formItemConfigArrComp">
            <el-input
              v-if="formItemConfig.itemType === 'input'"
              v-model="formData[formItemConfig.prop]"
              :key="idx"
            ></el-input>
            <el-select
              v-else-if="formItemConfig.itemType === 'select'"
              v-model="formData.sex"
              :key="idx"
            >
              <template v-if="formItemConfig.optionArr">
                <el-option
                  v-for="option in formItemConfig.optionArr"
                  :key="option.value"
                  :value="option.value"
                  :label="option.label"
                ></el-option>
              </template>
            </el-select>
          </template>
        </AppFormTwo>
      </el-form>
    </div>
  </div>
</template>

<script>
import AppBtn from '../components/globalComponents/AppBtn.vue';
import AppPdf from '@/components/AppPdf';
import UploadDialog from '@/components/UploadDialog';
import previewImg from '@/components/previewImg';
import signContract from '@/components/signContract';
import AppFormOne from '@/components/AppForm/indexOne.vue';
import AppFormTwo from '@/components/AppForm/indexTwo.vue';

export default {
  name: 'home',
  components: {
    AppPdf,
    AppBtn,
    UploadDialog,
    previewImg,
    signContract,
    AppFormOne,
    AppFormTwo
  },
  data() {
    // 表单项配置
    const formItemConfigArr = [
      {
        prop: 'sex',
        label: '成语故',
        itemType: 'select',
        optionArr: [],
        rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
      },
      {
        prop: 'name',
        label: '姓名',
        itemType: 'input'
      },
      {
        prop: 'three',
        label: '成语故事',
        itemType: 'select',
        optionArr: []
      },
      {
        prop: 'four',
        label: '一二三四五',
        itemType: 'select',
        optionArr: []
      }
    ];
    return {
      pdfBox: false,
      pdfInfo: {
        url:
          'https://is836c-public.oss.lafyun.com/dist/img/8f1cf2ad-eee6-4296-b223-35e38618eb47_%E9%A1%B9%E7%9B%AE%E4%BC%98%E5%8C%96.pdf'
      },
      previewBox: false,
      images: [
        {
          url:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg'
        }
      ],
      uploadBox: false,
      dialogInfo: {},
      buttonLoading: false,
      signContractBox: false,
      signInfo: [
        {
          name: '文件1',
          uploadId: 1,
          isEncryption: false,
          isCanSign: true
        }
      ],
      elFormAttrs: {
        inline: true,
        labelWidth: '81px'
      },
      formData: {
        sex: 1
      },
      formItemConfigArr
    };
  },
  computed: {
    /*
    表单项的显示/隐藏通过计算属性实现，可以认为计算属性就只关注控制哪些表单项需要显示,
    哪些需要隐藏，就可以了。算是一种职责分离
    */
    formItemConfigArrComp() {
      return this.formItemConfigArr.filter((item) => {
        if (this.formData.sex === 3 && item.prop === 'name') {
          return null;
        }
        return item;
      });
    }
  },
  created() {
    this.loadFormData();
    this.loadSexOptions();
  },
  methods: {
    closeSignContractBox(data) {
      if (data) {
      } else {
        this.signContractBox = false;
      }
    },
    loadFormData() {
      setTimeout(() => {
        this.formData = {
          name: '张三',
          sex: 1
        };
      }, 1000);
    },
    loadSexOptions() {
      setTimeout(() => {
        const item = this.formItemConfigArr.find((item) => item.prop === 'sex');
        if (item) {
          const sexOptionArr = [
            { value: 1, label: '选项1' },
            { value: 2, label: '选项2' },
            { value: 3, label: '选项3' }
          ];
          item.optionArr = sexOptionArr;
        }
      }, 1500);
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px;
}

.js-validate-form ::v-deep .is-error .o-show-data {
  color: red;
}
.demo-form {
  ::v-deep .el-form-item__label {
    line-height: 1.6;
    display: inline-flex;
    height: 40px;
    justify-items: right;
    justify-content: flex-end;
    align-items: center;
    .o-custom-label {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>
