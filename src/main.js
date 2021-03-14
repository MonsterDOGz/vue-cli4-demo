/*
 * @Author: MonsterDOG
 * @Date: 2020-07-09 09:25:41
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 15:04:52
 * @FilePath: /vue-cli4-demo/src/main.js
 * @Description: 【描述】
 */
import Vue from 'vue';

import 'normalize.css/normalize.css'; // CSS 重置

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import '@/styles/index.scss'; // 全局 css

import App from './App.vue';
import router from './router';
import store from './store';

import '@/permission'; // 权限控制

import '@/filter'; // 全局过滤器
import './components/globalComponents/_globals.js'; // 全局注册组件
import '@/icons/index.js';
// import api from '@/request/index.js'; // 全局注入 api 接口
import cLoading from '@/components/loading/index.js'; // 自定义loading指令

import { init, bind } from './utils/custom-life-cycle'; // 自定义生命周期
init();

/**
  * 如果您不想使用模拟服务器
  * 你想使用MockJs来模拟api
  * 你可以执行:mockXHR()
  *
  * 目前MockJs将在生产环境中使用，
  * 请在上网前删除它!!!
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock');
  mockXHR();
}

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 注入全局属性
Object.assign(Vue.prototype, {
  // $api: api,
  _: require('lodash'),
  $cLoading: cLoading
});

const vm = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');

// 将rootVm 绑定到生命周期函数监听里面
bind(vm);
