<template>
  <div class="home">
    <el-button @click="btn" type="primary">打开loading</el-button>
    <el-button @click="btn2">打开dialog</el-button>
    <el-button @click="btn3">打开MessageBox</el-button>
    <img src="@/assets/眼睛.png" class="yulan" @click="previewImg()" />
    <!-- <el-button @click="previewPdf()">打开pdf</el-button> -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
    <previewImg :img="imgs" ref="comView"></previewImg>
    <pdf v-if="pdfBox" :pdfUrl="pdfUrl" v-on:toFatherClosePdf="pdfBox = false"></pdf>
    <el-table :data="tableData" style="width: 1200px">
      <el-table-column prop="date" label="日期" width="180" class="upload"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址" width="180"> </el-table-column>
      <el-table-column label="上传" align="center" width="180">
        <template slot-scope="scope">
          <tableUpload :info="scope.row"></tableUpload>
        </template>
      </el-table-column>
      <el-table-column label="下载" align="center" width="180">
        <template slot-scope="scope">
          <tableDownload :info="scope.row"></tableDownload>
        </template>
      </el-table-column>
      <el-table-column label="预览" align="center" width="180">
        <template slot-scope="scope">
          <tablePreview :info="scope.row"></tablePreview>
        </template>
      </el-table-column>
      <el-table-column label="上链信息" align="center" width="180">
        <template slot-scope="scope">
          <tableBlockChain :info="scope.row"></tableBlockChain>
        </template>
      </el-table-column>
      <el-table-column label="文本信息" align="center" width="180">
        <template slot-scope="scope">
          <tableTextInfo :info="scope.row"></tableTextInfo>
        </template>
      </el-table-column>
    </el-table>
    <div>
      <svg class="icon" aria-hidden="true" style="font-size:30px;fill: green !important;">
        <use xlink:href="#iconxinghao"></use>
      </svg>
    </div>
  </div>
</template>

<script>
import { loadingMixin, previewMixin } from '@/mixin/base.js';
import previewImg from '@/components/previewImg.vue'; // 预览图片组件
import pdf from '@/components/pdf.vue'; // 预览pdf组件
import tableUpload from '@/components/tableUpload.vue'; // table列上传组件
import tableDownload from '@/components/tableDownload.vue'; // table列下载组件
import tablePreview from '@/components/tablePreview.vue'; // table列预览组件
import tableBlockChain from '@/components/tableBlockChain.vue'; // table列上链信息组件
import tableTextInfo from '@/components/tableTextInfo.vue'; // table列文本信息组件
export default {
  name: 'home',
  components: {
    previewImg,
    pdf,
    tableUpload,
    tableDownload,
    tablePreview,
    tableBlockChain,
    tableTextInfo
  },
  mixins: [loadingMixin, previewMixin],
  data() {
    return {
      dialogVisible: false,
      // imgs: [
      //   {
      //     url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
      //     title: '图片1'
      //   },
      //   {
      //     url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg',
      //     title: '图片2'
      //   }
      // ],
      imgs: {
        url:
          'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
        title: '图片1'
      },
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄',
          isCanUpload: true, // 是否可以上传
          isNeedSecret: false, // 是否需要加密
          uploadId: null, // 文件上传ID
          url: '' // 文件url
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄',
          isCanUpload: false, // 是否可以上传
          isNeedSecret: false, // 是否需要加密
          uploadId: 2, // 文件上传ID
          url:
            'http://xitianqujing.oss-cn-hangzhou.aliyuncs.com/test/d37a0ee5-9982-4c5e-873b-846bad926a37.pdf' // 文件url
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          isCanUpload: false, // 是否可以上传
          isNeedSecret: true, // 是否需要加密
          uploadId: 3, // 文件上传ID
          url:
            'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg' // 文件url
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄',
          isCanUpload: true, // 是否可以上传
          isNeedSecret: false, // 是否需要加密
          uploadId: null, // 文件上传ID
          url: '' // 文件url
        }
      ]
    };
  },
  methods: {
    btn() {
      this.openFullScreen('疯狂加载中。。。。。。。。。');
    },
    btn2() {
      this.dialogVisible = true;
    },
    btn3() {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
    }
  },
  created() {
    var fruits = ['Banana', 'Orange'];
    var energy = fruits.key();
    console.log(energy);
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 700px;
  background-color: #e6a23c;
}
.yulan {
  width: 30px;
  cursor: pointer;
}
</style>
