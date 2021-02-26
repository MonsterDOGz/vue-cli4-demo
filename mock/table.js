/*
 * @Author: MonsterDOG
 * @Date: 2021-02-26 09:44:01
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 09:44:53
 * @FilePath: /vue-cli4-demo/mock/table.js
 * @Description: 【描述】
 */
const Mock = require('mockjs');

const data = Mock.mock({
  'items|30': [{
    id: '@id',
    title: '@sentence(10, 20)',
    'status|1': ['published', 'draft', 'deleted'],
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
});

module.exports = [
  {
    url: '/vue-admin-template/table/list',
    type: 'get',
    response: config => {
      const items = data.items;
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      };
    }
  }
];
