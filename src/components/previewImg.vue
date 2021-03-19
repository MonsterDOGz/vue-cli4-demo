<!--
  * @Author：xiaolong
  * @Date: 2020
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-19 14:08:27
  * @Description: 图片预览组件，支持多张图片翻页、放大缩小
-->

<template>
  <div class="preview-img">
    <div class="images" ref="images" v-viewer="options" @hide="$_hide">
      <!-- alt可以改变图片下方标注的名称 -->
      <img v-for="item in images" :src="item.url" :key="item.url" alt=" " />
    </div>
  </div>
</template>

<script>
import 'viewerjs/dist/viewer.css';
import Viewer from 'v-viewer';
import Vue from 'vue';
Vue.use(Viewer);
export default {
  /**
   * 从父组件传入一个数组对象形式的images，eg:
   * [{
   *   url: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=85690711,3884201894&fm=27&gp=0.jpg',
   * }]
   */
  props: {
    images: {
      type: Array,
      required: true,
      default: () => {
        return [];
      }
    }
  },
  data() {
    return {
      viewer: '',
      options: {
        movable: false,
        title: false,
        zoomOnWheel: false,
        minZoomRatio: 0.1,
        maxZoomRatio: 10,
        toolbar: {
          zoomIn: {
            show: 1,
            size: 'large'
          },
          zoomOut: {
            show: 1,
            size: 'large'
          },
          oneToOne: {
            show: 1,
            size: 'large'
          },
          reset: {
            // show: 0
            show: 1,
            size: 'large'
          },
          prev: {
            show: 1,
            size: 'large'
          },
          play: {
            // show: 0
            show: 1,
            size: 'large'
          },
          next: {
            show: 1,
            size: 'large'
          },
          rotateLeft: {
            // show: 0
            show: 1,
            size: 'large'
          },
          rotateRight: {
            // show: 0
            show: 1,
            size: 'large'
          },
          flipHorizontal: {
            // show: 0
            show: 1,
            size: 'large'
          },
          flipVertical: {
            // show: 0
            show: 1,
            size: 'large'
          }
        }
      }
    };
  },
  methods: {
    // 显示时触发
    $_show() {
      this.viewer = this.$el.querySelector('.images').$viewer;
      this.viewer.show();
    },
    // 隐藏时触发
    $_hide() {
      this.viewer.index = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.preview-img {
  display: none;
}
</style>

<style lang="scss">
.viewer-container {
  .viewer-footer {
    .viewer-toolbar {
      ul {
        // 左箭头
        .viewer-prev {
          position: fixed;
          top: 50%;
          left: 5%;
          transform: translate(-50%, -50%);
          width: 62px;
          height: 62px;

          &::before {
            background: url('../assets/icon-left.png') no-repeat top 14px left 13px;
            width: 62px;
            height: 62px;
            margin: 0;
          }
        }

        // 右箭头
        .viewer-next {
          position: fixed;
          top: 50%;
          right: 5%;
          transform: translate(50%, -50%);
          width: 62px;
          height: 62px;

          &::before {
            background: url('../assets/icon-right.png') no-repeat top 14px left 15px;
            width: 62px;
            height: 62px;
            margin: 0;
          }
        }
      }
    }
  }

  // 关闭按钮
  .viewer-close {
    width: 100px;
    height: 100px;
    right: -50px;
    top: -50px;

    &::before {
      background: url('../assets/icon-close.png') no-repeat top 24px left 4px;
      background-size: 20px 20px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
