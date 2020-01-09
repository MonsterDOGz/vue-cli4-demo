<template>
  <div class="home">
    <el-button @click="btn" type="primary">打开loading</el-button>
    <el-button @click="btn2">打开dialog</el-button>
    <el-button @click="btn3">打开MessageBox</el-button>
    <img src="@/assets/眼睛.png" class="yulan" @click="checkImg(imgs[0].url)">
    <el-button @click="btn4">打开pdf</el-button>
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
    <previewImg :imgs="imgs" ref="comView"></previewImg>
    <pdf v-if="pdfBox" :pdfUrl="pdfUrl" v-on:toFatherClosePdf="pdfBox = false"></pdf>
  </div>
</template>

<script>
import { loadingMixin } from '@/mixin/base.js';
import previewImg from '@/components/previewImg.vue'; // 预览图片组件
import pdf from '@/components/pdf.vue'; // 预览pdf组件
export default {
  name: 'home',
  components: {
    previewImg,
    pdf
  },
  mixins: [loadingMixin],
  data () {
    return {
      dialogVisible: false,
      imgs: [
        {
          url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
          title: '图片1'
        },
        {
          url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg',
          title: '图片2'
        }
      ],
      pdfBox: false,
      pdfUrl: 'https://xitianqujing.oss-cn-hangzhou.aliyuncs.com/001213d1ebcd497e96aacd07c622cc75.pdf'
    };
  },
  created () {
  },
  methods: {
    btn () {
      this.openFullScreen('疯狂加载中。。。。。。。。。');
    },
    btn2 () {
      this.dialogVisible = true;
    },
    btn3 () {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    btn4 () {
      this.pdfBox = true;
    },
    checkImg(index) {
      this.$refs.comView.show(index);
    }
  }
};
</script>

<style lang="scss" scoped>
.home{
  width: 100%;
  height: 700px;
  background-color: #e6a23c
}
.yulan {
  width: 30px;
  cursor: pointer;
}
</style>
