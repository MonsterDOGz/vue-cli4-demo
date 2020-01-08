import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import echarts from 'echarts';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/filter';
import '@/icons/iconfont/iconfont.css';
import '@/styles/reset.css';
import '@/styles/index.scss';
import '@/permission.js';
import '@/utils/variables';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.prototype.axios = axios;
Vue.prototype.echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
