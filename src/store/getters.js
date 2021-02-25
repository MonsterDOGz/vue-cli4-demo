/*
 * @Author: MonsterDOG
 * @Date: 2020-03-21 11:05:09
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-02-25 17:57:00
 * @FilePath: /vue-cli4-demo/src/store/getters.js
 * @Description: 【描述】
 */
const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name
};
export default getters;
