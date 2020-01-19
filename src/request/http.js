import axios from 'axios'; // 引入axios
import store from '../store/index.js';

console.log(process.env.NODE_ENV);

// 环境的切换
// if (process.env.NODE_ENV === 'development') {
//   axios.defaults.baseURL = '/api/yifd'
// } else if (process.env.NODE_ENV === 'testing') {
//   axios.defaults.baseURL = 'https://tdev.homedone.net'
// } else if (process.env.NODE_ENV === 'production') {
//   axios.defaults.baseURL = 'https://ddev.homedone.net'
// }

console.info(location.hostname);
if (location.hostname === ('192.168.10.72' || 'localhost')) {
  axios.defaults.baseURL = '/api/yifd';
} else {
  axios.defaults.baseURL = `https://${location.hostname}`;
}

/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 401：未登录状态，跳转登录页
    case 401:
      break;
    // 403：token过期
    // 清除token并跳转登录页
    case 403:
      this.$message({
        message: '登录过期，请重新登陆',
        type: 'warning'
      });
      window.sessionStorage.removeItem('token'); // 删除本地的token
      // localStorage.removeItem('token')
      break;
    // 404：请求不存在
    case 404:
      this.$message({
        message: '请求的资源不存在',
        type: 'warning'
      });
      break;
    // 服务器错误
    case 500:
      this.$message({
        message: other,
        type: 'warning'
      });
      break;
    default:
      console.log(other);
  }
};

// 创建axios实例
var instance = axios.create({
  timeout: 1000 * 100
});

// post请求头
// axios.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
  function (config) {
    // 该位置会获取登陆成功时的token数据，保存到Authorization(定义绑定的头部参数为token)中，验证token是否存在，并且
    // 与登陆时的token进行对比，验证token是否正确
    var token = window.sessionStorage.getItem('token');
    if (token) {
      config.headers.token = token;
    }
    if (config.url.includes('ossUpload')) {
      config.timeout = 600000;
    } else {
      config.timeout = 100000;
    }
    return config;
  },
  function (error) {
    console.log(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功
  res => {
    console.log();
    res.status === 200 ? Promise.resolve(res) : Promise.reject(res);
    if (res.data.meta.message === 'token过期，请重新登录') {
      if (sessionStorage.getItem('token')) {
        alert('token过期，请重新登录');
      }
      window.location = '#/dLogin'; // 重定向回到登陆页面
      window.sessionStorage.removeItem('token'); // 删除本地的token
    }
    return res;
  },
  // 请求失败
  error => {
    const {
      response
    } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      // 请求超时或断网时，更新state的network状态
      // eg：network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
      // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
      console.log(!window.navigator.onLine);
      if (!window.navigator.onLine) {
        store.commit('changeNetwork', false);
      } else {
        return Promise.reject(error);
      }
    }
  }
);

export default instance;
