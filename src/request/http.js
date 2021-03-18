/*
 * @Author: MonsterDOG
 * @Date: 2020-11-25 20:28:33
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 22:48:22
 * @FilePath: /vue-cli4-demo/src/request/http.js
 * @Description: 【描述】axios 实例，请求拦截器、响应拦截器
 */
import axios from 'axios'; // 引入axios
import { MessageBox, Message } from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';

// 创建axios实例
const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000
});

// 请求拦截器
instance.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers.token = getToken();
    }
    // 配置特殊需求的请求超时时间
    // if (config.url.includes('ossUpload')) {
    //   config.timeout = 60000;
    // } else {
    //   config.timeout = 5000;
    // }
    return config;
  },
  error => {
    console.log(error);
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  response => {
    const res = response.data;
    // 20000 为服务端的正常响应
    if (res.code !== 20000) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      });
      // 50008:非法令牌;50012:其他客户端已登录;50014:令牌过期;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        MessageBox.confirm('您已经登出，您可以取消留在此页面，或重新登录', '确认登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '退出',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload();
          });
        });
      }
      return Promise.reject(new Error(res.message || 'Error'));
    } else {
      return res;
    }
  },
  // 请求失败
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default instance;
