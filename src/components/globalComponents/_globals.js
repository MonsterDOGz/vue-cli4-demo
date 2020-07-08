import vue from 'vue';

const requireComponent = require.context(
  // webpack的api，一个函数方法，匹配文件
  '.', // 查看当前目录下的文件(查找需要文件的相对路径)
  false, // 不查看子文件
  /.vue$/ // 匹配方式正则表达式，只查看后缀为.vue的文件
);
// console.log(requireComponent)
// 循环获取到的文件，可在循环时处理文件名
requireComponent.keys().forEach(fileName => {
  // 获取组件配置(组件模板)
  const componentConfig = requireComponent(fileName);
  // 将被注册的组件名字,对获取的组件文件名进行处理
  const componentName = fileName
    .replace(/^\.\/_/, '')
    .replace(/\.\w+$/, '')
    .split('./')
    .join('');

  // 将组件在循环中注册到全局，
  vue.component(componentName, componentConfig.default || componentConfig);
});
