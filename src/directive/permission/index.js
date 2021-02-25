/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 11:25:22
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 11:27:47
 * @FilePath: /vue-cli4-demo/src/directive/permission/index.js
 * @Description: 【描述】按钮级别权限 自定义指令
 */
import permission from './permission';

const install = function(Vue) {
  Vue.directive('permission', permission);
};

if (window.Vue) {
  window['permission'] = permission;
  Vue.use(install); // eslint-disable-line
}

permission.install = install;
export default permission;
