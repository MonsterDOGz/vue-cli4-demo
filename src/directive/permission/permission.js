/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 11:25:55
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 11:28:06
 * @FilePath: /vue-cli4-demo/src/directive/permission/permission.js
 * @Description: 【描述】
 */
import store from '@/store';

function checkPermission(el, binding) {
  const { value } = binding;
  const roles = store.getters && store.getters.roles;

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value;

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role);
      });

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`);
  }
}

export default {
  inserted(el, binding) {
    checkPermission(el, binding);
  },
  update(el, binding) {
    checkPermission(el, binding);
  }
};
