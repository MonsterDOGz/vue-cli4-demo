/*
 * @Author: MonsterDOG
 * @Date: 2021-03-13 13:25:36
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:34:05
 * @FilePath: /vue-cli4-demo/src/request/modules/userApi.js
 * @Description: 【描述】
 */
import base from '../base';
import axios from '../http';

export function login (data) {
  return axios({
    url: `${base.template}/user/login`,
    method: 'post',
    data
  });
}
export function getInfo (token) {
  return axios({
    url: `${base.template}/user/info`,
    method: 'get',
    params: { token }
  });
}
export function logout() {
  return ({
    url: `${base.template}/user/logout`,
    method: 'post'
  });
}

const userApi = {
  login,
  getInfo,
  logout
};

export default userApi;
