/*
 * @Author: MonsterDOG
 * @Date: 2020-07-09 09:25:41
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 17:55:01
 * @FilePath: /vue-cli4-demo/src/main.js
 * @Description: 【描述】
 */
import Vue from 'vue';

import 'normalize.css/normalize.css'; // A modern alternative to CSS resets

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // global css

import App from './App.vue';
import router from './router';
import store from './store';

import '@/permission'; // permission control

import '@/filter'; // 引入全局过滤器
import './components/globalComponents/_globals.js'; // 引入全局注册组件
import '@/icons/index.js';
import api from '@/request/index.js';
import cLoading from '@/components/loading/index.js'; // 自定义loading指令
import echarts from './echarts.js';

import { init, bind } from './utils/custom-life-cycle'; // 自定义生命周期
init();

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

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
