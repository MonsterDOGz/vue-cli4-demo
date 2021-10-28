import Vue from 'vue';
import Router from 'vue-router';

/* Layout */
import Layout from '@/layout';

Vue.use(Router);

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404/index'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: '首页',
        component: () => import('@/views/Home'),
        meta: { title: '首页', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/echarts',
    component: Layout,
    redirect: '/echarts/echarts1',
    name: 'Echarts',
    meta: { title: 'Echarts', icon: 'el-icon-pie-chart' },
    children: [
      {
        path: 'echarts1',
        name: 'Echarts1',
        component: () => import('@/views/echarts/index'),
        meta: { title: 'Echarts1', icon: 'table' }
      },
      {
        path: 'echarts2',
        name: 'Echarts2',
        component: () => import('@/views/echarts/index2/index'),
        meta: { title: 'Echarts2', icon: 'tree' }
      }
    ]
  },

  {
    path: '/cyberpunk',
    component: Layout,
    redirect: '/cyberpunk/cyberpunk',
    children: [
      {
        path: 'cyberpunk',
        name: 'Cyberpunk',
        component: () => import('@/views/cyberpunk/index'),
        meta: { title: 'Cyberpunk', icon: 'cyberpunk' }
      }
    ]
  },

  {
    path: '/threeJsDemo',
    component: Layout,
    redirect: '/threeJsDemo/threeJsDemo',
    children: [
      {
        path: 'threeJsDemo',
        name: 'ThreeJsDemo',
        component: () => import('@/views/threeJsDemo/index'),
        meta: { title: 'ThreeJsDemo', icon: 'cyberpunk' }
      }
    ]
  },

  {
    path: '/map',
    component: Layout,
    redirect: '/map/map',
    children: [
      {
        path: 'map',
        name: 'Map',
        component: () => import('@/views/map/index'),
        meta: { title: 'map', icon: 'map' }
      }
    ]
  },
  {
    path: '/cssShuffling',
    component: Layout,
    redirect: '/cssShuffling/cssShuffling',
    children: [
      {
        path: 'cssShuffling',
        name: 'CssShuffling',
        component: () => import('@/views/cssShuffling/index'),
        meta: { title: 'cssShuffling', icon: 'map' }
      }
    ]
  },
  {
    path: '/css3D',
    component: Layout,
    redirect: '/css3D/css3D',
    children: [
      {
        path: 'css3D',
        name: 'Css3D',
        component: () => import('@/views/css3D/index'),
        meta: { title: 'css3D', icon: 'map' }
      }
    ]
  },

  {
    path: '/external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
];

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  });

const router = createRouter();

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; // reset router
}

export default router;
