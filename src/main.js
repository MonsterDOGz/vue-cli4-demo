import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import echarts from 'echarts';
import '@/styles/theme/index.css'; // 引入elementui自定义主题
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css'; // 引入elementui默认样式
import Viewer from 'v-viewer';
import 'viewerjs/dist/viewer.css';
import '@/filter';
import '@/icons/iconfont/iconfont.css';
import '@/styles/reset.css';
import '@/styles/elementui.css'; // 初始化elementui样式
import '@/styles/index.scss';
// import '@/permission.js';
import '@/utils/variables';
import api from '@/request/index.js';

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { 'inline': true, 'button': true, 'navbar': true, 'title': true, 'toolbar': true, 'tooltip': true, 'movable': true, 'zoomable': true, 'rotatable': true, 'scalable': true, 'transition': true, 'fullscreen': true, 'keyboard': true, 'url': 'data-source' }
});

Vue.prototype.$api = api;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
