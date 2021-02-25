/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 17:33:28
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 17:33:29
 * @FilePath: /vue-cli4-demo/src/utils/auth.js
 * @Description: 【描述】
 */
import Cookies from 'js-cookie';

const TokenKey = 'vue_admin_template_token';

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
