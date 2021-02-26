/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 17:43:18
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-26 10:59:01
 * @FilePath: /vue-cli4-demo/src/utils/validate.js
 * @Description: 【描述】
 */
/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  // eslint-disable-next-line camelcase
  const valid_map = ['admin', 'editor'];
  return valid_map.indexOf(str.trim()) >= 0;
}
