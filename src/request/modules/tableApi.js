/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 17:32:52
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:35:32
 * @FilePath: /vue-cli4-demo/src/request/modules/tableApi.js
 * @Description: 【描述】
 */
import base from '../base';
import axios from '../http';

export function getList (params) {
  return axios({
    url: `${base.template}/table/list`,
    method: 'get',
    params
  });
}

const tableApi = {
  getList
};

export default tableApi;
