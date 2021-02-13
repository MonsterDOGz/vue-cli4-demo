/*
 * @Author: MonsterDOG
 * @Date: 2020-07-09 09:25:41
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-01 13:34:47
 * @FilePath: /vue-cli4-demo/src/main.js
 * @Description: 【描述】
 */
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/filter'; // 引入全局过滤器
import './components/globalComponents/_globals.js'; // 引入全局注册组件
import '@/styles/theme/index.css'; // 引入elementui自定义主题
import ElementUI from 'element-ui';
import '@/styles/reset.css';
import '@/styles/index.scss';
import '@/icons/index.js';
import api from '@/request/index.js';
import { init, bind } from './utils/custom-life-cycle'; // 自定义生命周期
import cLoading from '@/components/loading/index.js'; // 自定义loading指令
import echarts from './echarts.js';
init();

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 声明全局属性
Object.assign(Vue.prototype, {
  $api: api,
  _: require('lodash'),
  $cLoading: cLoading,
  $echarts: echarts
});

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 将rootVm 绑定到生命周期函数监听里面
bind(vm);
