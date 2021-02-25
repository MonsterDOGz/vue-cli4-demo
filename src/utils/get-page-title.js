/*
 * @Author: MonsterDOG
 * @Date: 2021-02-25 17:51:10
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 17:51:18
 * @FilePath: /vue-cli4-demo/src/utils/get-page-title.js
 * @Description: 【描述】
 */
import defaultSettings from '@/settings';

const title = defaultSettings.title || 'Vue Admin Template';

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
