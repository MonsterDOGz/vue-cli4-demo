import base from '../base';
import axios from '../http';
// import qs from 'qs'

const baseApi = {
  // -------------------------------------公共接口----------------------------------------
  // 获取签章统一接口
  apiESignatureSealData (id) {
    return axios.get(`${base.yifd}/public/eSignatureSealData/${id}`);
  },
  // 签章验证时的密码验证
  apiPasswordYz (params) {
    return axios.post(`${base.yifd}/user/checkPassword`, params);
  }
};

export default baseApi;
