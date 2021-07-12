<!--
 * @Author: MonsterDOG
 * @Date: 2021-04-12 22:18:19
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-04-16 16:13:03
 * @FilePath: /vue-cli4-demo/src/views/threeJsDemo/index.vue
 * @Description: 【描述】
-->
<template>
  <div class="hello" ref="container"></div>
</template>

<script>
import * as Three from 'three';
export default {
  data() {
    return {};
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      const container = this.$refs.container; // 获取dom
      const width = container.clientWidth;
      const height = container.clientHeight; // 获取宽高
      const camera = new Three.PerspectiveCamera(70, width / height, 0.01, 10); // 相机    camera.position.z = 0.6;
      const scene = new Three.Scene();
      const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2);
      const material = new Three.MeshNormalMaterial();
      const mesh = new Three.Mesh(geometry, material);
      scene.add(mesh);
      let animate = () => {
        requestAnimationFrame(animate);
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
        renderer.render(scene, camera);
      };
      animate(); // 先创建一个简单的三维物体
    },
    run() {}
  }
};
</script>

<style lang="scss" scoped>
.class {
  width: 100vw;
  height: 100vh;
}
</style>
