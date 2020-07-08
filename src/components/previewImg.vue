<template>
  <div class="main">
    <div class="images" ref="images" v-viewer="{movable: false}" @hide="hide" v-show="imagesBox">
      <img v-for="(item, index) in imgs" :src="item.url" :key="index">
    </div>
  </div>
</template>

<script>
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import Vue from 'vue';
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
});
export default {
  /**
  * 传入img，eg:
  * [{
  *   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
  * }]
  */
  props: {
    img: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  data () {
    return {
      imagesBox: false
    };
  },
  methods: {
    show () {
      this.imagesBox = true;
      const viewer = this.$el.querySelector('.images').$viewer;
      viewer.show();
    },
    hide () {
      this.$emit('toFatherClose');
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
