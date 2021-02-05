/*
 * @Author: MonsterDOG
 * @Date: 2020-03-21 11:05:09
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-01 11:39:41
 * @FilePath: /vue-cli4-demo/src/router/index.js
 * @Description: 【描述】
 */
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const constantRoutes = [
  {
    path: '/',
    name: 'home',
    hidden: true,
    component: () => import('../views/Home'),
    meta: { title: '首页' }
  },
  {
    path: '/test',
    name: 'the-test',
    component: () => import('../views/test/TheTest.vue')
  },
  {
    path: '/echarts',
    name: 'Echarts',
    component: () => import('../views/echarts/index.vue')
  },
  // 404页面需要放到最末尾,先行注册404界面,否则无法指向404界面会报错
  {
    path: '/404',
    name: 'page404',
    hidden: true,
    component: () => import('../views/404'),
    meta: { title: '404' }
  },
  // 指向页面错误跳转到404
  { path: '*', redirect: '/404', hidden: true }
];

// 创建一个vue-router 并且每次切换页面都调整滚动条的高度,并且存入固定路由界面
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });
// };

// 重置路由方法
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

const router = createRouter();
export default router;
