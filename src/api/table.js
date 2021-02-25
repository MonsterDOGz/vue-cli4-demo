/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 17:32:52
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 17:32:57
 * @FilePath: /vue-cli4-demo/src/api/table.js
 * @Description: 【描述】
 */
import request from '@/utils/request';

export function getList(params) {
  return request({
    url: '/vue-admin-template/table/list',
    method: 'get',
    params
  });
}
