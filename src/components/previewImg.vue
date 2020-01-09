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
  * 从父组件传入图片数组imgs
  * eg:
  * [{
  *   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
  *   title: '图片1'
  * }]
  */
  props: {
    imgs: {
      type: Array,
      required: true,
      default: () => {
        return { message: 'error' };
      }
    }
  },
  data () {
    return {
    };
  },
  methods: {
    show (index) {
      const viewer = this.$el.querySelector('.images').$viewer;
      viewer.view(index);
    }
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
