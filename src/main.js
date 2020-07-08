import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/filter'; // 引入全局过滤器
import './components/globalComponents/_globals.js'; // 引入全局注册组件
import '@/styles/theme/index.css'; // 引入elementui自定义主题
import '@/styles/elementui.css'; // 初始化elementui样式
import ElementUI from 'element-ui';
import '@/icons/iconfont/iconfont.css';
import '@/styles/reset.css';
import '@/styles/index.scss';
// import '@/utils/variables';
import echarts from 'echarts';
import api from '@/request/index.js';

Vue.config.productionTip = false;
Vue.use(ElementUI);

// 声明全局属性
Object.assign(Vue.prototype, {
  $api: api,
  $echarts: echarts,
  _: require('lodash')
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app');
