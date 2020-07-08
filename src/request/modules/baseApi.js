import base from '../base';
import axios from '../http';
// import qs from 'qs'

const baseApi = {
  // -------------------------------------公共接口----------------------------------------
  apiRegion () {
    return axios.get(`${base.yifd}/enumUtil/region`);
  }
};

export default baseApi;
