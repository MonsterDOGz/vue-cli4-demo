/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 17:32:52
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 20:14:35
 * @FilePath: /vue-cli4-demo/src/request/modules/baseApi.js
 * @Description: 【描述】
 */
import base from '../base';
import axios from '../http';

export function apiGetPolicy (params) {
  return axios({
    url: `${base.file}/getPolicy`,
    method: 'get',
    params
  });
}

export function apiESignatureSealData () {
  return axios({
    url: `${base.file}/ESignatureSealData`,
    method: 'get'
  });
}

export function apiFileUrl (params) {
  return axios({
    url: `${base.file}/fileUrl`,
    method: 'get',
    params
  });
}

export function apiSealTheObject (params) {
  return axios({
    url: `${base.file}/sealTheObject`,
    method: 'post',
    params
  });
}

const baseApi = {
  apiGetPolicy,
  apiESignatureSealData,
  apiFileUrl,
  apiSealTheObject
};

export default baseApi;
