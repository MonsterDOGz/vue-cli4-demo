import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/filter'; // 引入全局过滤器
import './components/globalComponents/_globals.js'; // 引入全局注册组件
import '@/styles/theme/index.css'; // 引入elementui自定义主题
import '@/styles/elementui.css'; // 初始化elementui样式
import ElementUI from 'element-ui';
import '@/styles/reset.css';
import '@/styles/index.scss';
import '@/icons/index.js';
// import '@/utils/variables';
import echarts from 'echarts';
import api from '@/request/index.js';
import { init, bind } from './utils/custom-life-cycle';
import cLoading from '@/components/loading/index.js';
init();

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 声明全局属性
Object.assign(Vue.prototype, {
  $api: api,
  $echarts: echarts,
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
