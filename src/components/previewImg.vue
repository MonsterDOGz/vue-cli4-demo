<!-- 此预览图片组件需要需要引入到目标组件中使用 -->
<!-- 例如"import previewImg from '@/components/previewImg.vue'" -->
<!-- html中使用<previewImg :img="url" ref="comView"></previewImg>，必须要绑定ref="comView"使用，url是传入的数据，详情见下 -->
<!-- 需要引入@/mixin/base.js中的previewMixin -->
<!-- 0.如果预览img和预览pdf一起使用，需要在对应的点击处绑定点击事件preview(picOrPdf) -->
<!-- 事件传入的picOrPdf是一个对象，对象里面必须包含url字段，就是img或者pdf的url -->
<!-- 1.如果只是预览img，并且存在多张图片的情况，需要在对应的点击处绑定点击事件previewImg() -->
<template>
  <div class="main">
    <div class="images" v-viewer="{movable: false}">
      <img v-for="(item, index) in imgs" :src="item.url" :key="index">
    </div>
  </div>
</template>
<script>
export default {
  /**
  * 0.预览img和预览pdf一起使用时，只需要传入一个url，eg:
  * img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg'
  *
  * ------------------------------以下是单独使用图片预览组件的情况---------------------------
  * 1.如果是单张图片，从父组件传入一个对象形式的img，eg:
  * {
  *   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg'
  * }
  *
  * 2.如果是多张图片，从父组件传入一个数组对象形式的img，eg:
  * [{
  *   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
  * }]
  */
  props: ['img'],
  data () {
    return {
      imgs: [] // 图片数组
    };
  },
  methods: {
    show (index) {
      const viewer = this.$el.querySelector('.images').$viewer;
      viewer.view(index);
    }
  },
  created () {
    console.log(this.img);
    if (this.img instanceof Array) { // 如果传入的是多个图片的数组
      this.imgs = this.img;
    } else if (this.img instanceof Object) { // 如果传入的是单个图片的对象
      this.imgs.push(this.img);
    } else { // 如果预览img和预览pdf一起使用
      const temp = {};
      temp.url = this.img;
      this.imgs.push(temp);
    }
    console.log(this.imgs);
  }
};
</script>

<style lang="scss" scoped>
.main{
  display:none;
  .images{
    width:0px;
    >img{
      width:100%
    }
  }
}
</style>
