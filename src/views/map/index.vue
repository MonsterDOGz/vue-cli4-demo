<!--
 * @Author: MonsterDOG
 * @Date: 2021-04-15 09:30:51
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-04-15 18:04:33
 * @FilePath: /vue-cli4-demo/src/views/map/index.vue
 * @Description: 【描述】
-->
<template>
  <div id="container"></div>
</template>

<script>
import AMap from '@/utils/AMap.js';
// 乘客坐标
const users = [
  [116.392708, 39.90508],
  [116.382708, 39.90508],
  [116.403708, 39.90508],
  [116.403708, 39.92528],
  [116.392108, 39.87528],
  [116.382308, 39.92108],
  [116.392208, 39.88908],
  [116.412408, 39.89008],
  [116.436408, 39.89808],
  [116.452758, 39.95558]
];
// 车辆坐标
const cars = [
  [116.394408, 39.86708],
  [116.353408, 39.85608]
];
// 路径1坐标
const line = [
  [
    [116.394408, 39.86708],
    [116.395408, 39.86908],
    [116.395408, 39.87708],
    [116.406408, 39.87708],
    [116.415408, 39.87808],
    [116.415408, 39.88808],
    [116.425408, 39.89808],
    [116.436408, 39.89808]
  ],
  [
    [116.353408, 39.85608],
    [116.36431, 39.858511],
    [116.37431, 39.872511],
    [116.384641, 39.882511],
    [116.396801, 39.899412],
    [116.406801, 39.902511],
    [116.416801, 39.915168],
    [116.452758, 39.95558]
  ]
];
export default {
  data() {
    return {
      map: null,
      resMap: null
    };
  },
  mounted() {
    this.initAMap();
  },
  methods: {
    async initAMap() {
      try {
        // 修改
        this.resMap = await AMap();

        this.map = new this.resMap.Map('container', {
          resizeEnable: true, // 是否监控地图容器尺寸变化
          zooms: [3, 19], // 设置地图级别范围
          zoom: 14, // 初始化地图层级
          zoomEnable: true, // 是否缩放
          scrollWheel: true, // 是否支持滚轮缩放
          dragEnable: true, // 是否支持鼠标拖拽平移
          jogEnable: true, // 是否支持缓动效果
          buildingAnimation: true, // 模块消失是否有动画效果
          center: [116.397428, 39.90923], // 初始化地图中心点
          mapStyle: 'amap://styles/69864e2171d0ffa24898d311eb6a351f' // 设置地图的显示样式
        });
        this.cycleCreate(); // 循环执行点的创建
      } catch (err) {
        console.error(err);
      }
    },
    // 循环执行点的创建，路线的更新
    cycleCreate() {
      cars.forEach(([lng, lat], index) => {
        const angle = this.computingAngle(line[index][0], line[index][1]);
        this.addMarker(lng, lat, this.addCarIcon, angle);
      });
      users.forEach(([lng, lat]) => {
        this.addMarker(lng, lat, this.addUserIcon);
      });
      this.addLine();
    },
    // 创建点标记
    addMarker(lng, lat, addIcon, angle = 0) {
      this.marker = new this.resMap.Marker({
        icon: addIcon(),
        position: [lng, lat],
        offset: new this.resMap.Pixel(-20, -20),
        angle,
        autoRotation: true
      });

      this.map.add([this.marker]);
      this.map.setFitView();
    },
    // 创建一个车辆 icon
    addCarIcon() {
      return new this.resMap.Icon({
        // 图标尺寸
        size: new this.resMap.Size(40, 40),
        // 图标的取图地址
        image: require('@/assets/车辆出入.png'),
        // 图标所用图片大小
        imageSize: new this.resMap.Size(40, 40)
        // 图标取图偏移量
        // imageOffset: new this.resMap.Pixel(0, 13)
      });
    },
    // 创建一个乘客 icon
    addUserIcon() {
      return new this.resMap.Icon({
        // 图标尺寸
        size: new this.resMap.Size(40, 40),
        // 图标的取图地址
        image: require('@/assets/人.png'),
        // 图标所用图片大小
        imageSize: new this.resMap.Size(40, 40)
        // 图标取图偏移量
        // imageOffset: new this.resMap.Pixel(0, 13)
      });
    },
    // 计算车辆的旋转角度
    computingAngle(point1, point2) {
      const x = point2[0] - point1[0];
      const y = point2[1] - point1[1];
      const angle = 90 - (Math.atan2(y, x) * 180) / Math.PI;
      console.log(angle);
      return angle;
    },
    // 绘制路径
    addLine() {
      let lineList = line.map(item => {
        return new this.resMap.Polyline({
          path: item, // 设置线覆盖物路径
          showDir: true,
          strokeColor: '#3366bb', // 线颜色
          strokeWeight: 10 // 线宽
        });
      });
      this.map.add(lineList);
    }
  }
};
</script>

<style lang="scss" scoped>
#container {
  width: 100vw;
  height: 100vh;
  background: transparent !important;
}
</style>
