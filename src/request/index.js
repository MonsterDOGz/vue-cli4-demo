/*
 * @Author: MonsterDOG
 * @Date: 2020-02-03 11:54:06
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:25:50
 * @FilePath: /vue-cli4-demo/src/request/index.js
 * @Description: 【描述】导出所有 api 接口
 */
// 模块接口（接口模块名称统一带有Api）
// 获取 ./modules文件夹下面所有的js文件名称
const modulesFiles = require.context('./modules', true, /.js$/);

// you do not need `import app from './modules/app'`
// it will auto require all vuex module from modules file
const modules = modulesFiles.keys().reduce((arr, modulePath) => {
  //   // set './app.js' => 'app'
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1');
  const value = modulesFiles(modulePath);
  arr[moduleName] = value.default;
  return arr;
}, {});

export default modules;
