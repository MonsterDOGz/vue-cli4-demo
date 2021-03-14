/*
 * @Author: MonsterDOG
 * @Date: 2020-05-13 21:11:46
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-14 16:10:45
 * @FilePath: /vue-cli4-demo/.prettierrc.js
 * @Description: 【描述】
 */
// 需配合prettier插件使用
// 在设置>文本编辑器>正在格式化>选择保存时格式化
module.exports = {
  jsxSingleQuote: true,
  disableLanguages: [], // 句尾添加分号
  arrowParens: 'avoid', // 箭头函数会自动判断 是否添加圆括号
  endOfLine: 'lf', // 采用lf 换行机制
  jsxBracketSameLine: false, // jsx换行时 尖括号放后面
  useTabs: false, // 是否采用tab是用来换行
  printWidth: 100, // 一行的字符数，如果超过会进行换行，默认为80
  semi: true, // 尾部是否具有分号
  singleQuote: true, // 是否使用单引号
  requireConfig: true,
  bracketSpacing: true, // 对象中是否使用空格
  tabWidth: 2, // tab缩进大小,默认为2
  useTabs: false, // 是否使用tab 作为缩进
  trailingComma: 'none' // 对象字面量结尾是否使用逗号
};
