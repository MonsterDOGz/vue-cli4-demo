/*
 * @Author: MonsterDOG
 * @Date: 2021-02-01 13:30:30
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-01 15:05:04
 * @FilePath: /vue-cli4-demo/src/echarts.js
 * @Description: 【描述】
 */
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';
// 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
import { TitleComponent, TooltipComponent, GridComponent } from 'echarts/components';
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart, LineChart, PieChart, ScatterChart, GaugeChart, TreeChart } from 'echarts/charts';

// 注册必须的组件
echarts.use([
  CanvasRenderer,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  GaugeChart,
  TreeChart
]);

export default echarts;
