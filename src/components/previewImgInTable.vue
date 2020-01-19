<!-- 表格内预览图片组件，一般在不清楚文件类型时，和预览pdf一起使用 -->
<!-- 例如"import previewImgInTable from '@/components/previewImgInTable.vue'" -->
<!-- html中使用<previewImgInTable :img="imgs" v-if="previewImgBox" v-on:toFatherCloseImg="previewImgBox = false"></previewImgInTable>，img是传入的数据，详情见下 -->
<!-- 需要引入@/mixin/base.js中的previewMixin -->
<template>
  <div class="Img">
    <div class="previewBox">
      <img :src="img.url">
    </div>
    <div class="previewClose"
         @click="previewClose">
      <i class="iconfont iconquxiao close"></i>
    </div>
  </div>
</template>

<script>
export default {
  /**
  * 从父组件传入img信息，以对象形式传入，必须包含url字段，目前只能预览一张img
  * eg:
  * img: {
  *   url: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3564877025,796183547&fm=27&gp=0.jpg'
  * }
  */
  props: {
    img: {
      type: Object,
      required: true,
      default: () => {
        return { message: 'hello' };
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    previewClose () {
      this.$emit('toFatherCloseImg');
    }
  }
};
</script>

<style lang="scss" scoped>
.Img {
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  .previewBox {
    height: 900px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
      max-width: 1120px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .previewClose {
    background-color: rgba(0, 0, 0, 0.3);
    width: 160px;
    height: 160px;
    border-radius: 50%;
    position: absolute;
    top: -80px;
    right: -80px;
    cursor: pointer;
    transition: 0.2s;
    .close {
      line-height: 50px;
      font-size: 50px;
      position: absolute;
      top: 55%;
      left: 15%;
      color: #fff;
    }
    .previewClose:hover {
      background-color: rgba(0, 0, 0, 0.7);
    }
  }
}
</style>
