/*
 * @Author: MonsterDOG
 * @Date: 2021-02-26 09:44:01
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-18 23:03:11
 * @FilePath: /vue-cli4-demo/mock/index.js
 * @Description: 【描述】
 */
const Mock = require('mockjs');
const { param2Obj } = require('./utils');

const user = require('./user');
const table = require('./table');
const base = require('./base');

const mocks = [
  ...user,
  ...table,
  ...base
];

// for front mock
// 请谨慎使用，它将重新定义浏览器的 XMLHttpRequest 对象，
// 这将导致你的许多第三方库无效(如进度事件)。
function mockXHR() {
  // mock patch
  // https://github.com/nuysoft/Mock/issues/300
  Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
  Mock.XHR.prototype.send = function() {
    if (this.custom.xhr) {
      this.custom.xhr.withCredentials = this.withCredentials || false;

      if (this.responseType) {
        this.custom.xhr.responseType = this.responseType;
      }
    }
    this.proxy_send(...arguments);
  };

  function XHR2ExpressReqWrap(respond) {
    return function(options) {
      let result = null;
      if (respond instanceof Function) {
        const { body, type, url } = options;
        // https://expressjs.com/en/4x/api.html#req
        result = respond({
          method: type,
          body: JSON.parse(body),
          query: param2Obj(url)
        });
      } else {
        result = respond;
      }
      return Mock.mock(result);
    };
  }

  for (const i of mocks) {
    Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
  }
}

module.exports = {
  mocks,
  mockXHR
};
