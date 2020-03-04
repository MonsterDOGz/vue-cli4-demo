# monsterdog

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### 项目目录结构

```js
├── public                     // 构建相关，放不会变动的文件
│   ├── favicon.ico            // 项目图标
│   ├── index.html             // 设置项目的一些meta头信息，提供用于挂载 vue 节点
├── src                        // 源代码，以及需要引用的资源文件
│   ├── assets                 // 图片,等静态资源
│   ├── components             // 全局公用组件
│   ├── request                // 请求资源文件夹
│   ├── ├── http.js            // axios的请求配置，请求拦截器，响应拦截器等
│   ├── ├── base.js            // 接口域名的管理
│   ├── ├── index.js           // api接口模块的管理
│   ├── ├── modules            // api接口模块文件
│   ├── store                  // vuex仓库
│   ├── ├── modules            // vuex仓库数据存放地址，可以根据板块需要自行分文件存储
│   ├── ├── index.js           // vuex仓库入口文件，收集modules中的文件数据进行整合
│   ├── ├── getters.js         // 对modules中的数据进行一个计算属性式的监听，state.文件名.属性名的方式可以访问到数据
│   ├── styles                 // 全局样式
│   ├── ├── reset.css          // 全局重置样式
│   ├── ├── index.scss         // 全局scss文件入口
│   ├── router                 // 路由配置
│   ├── mixin                  // 全局混入mixin
│   ├── filter                 // vue过滤数据
│   ├── ├── modules            // 全局过滤器存放地址，可以根据板块需要自行分文件存储
│   ├── ├── index.js           // 全局过滤器入口文件
│   ├── icons                  // 文字图标导入处
│   ├── ├── iconfont           // iconfont 文字图标存放地
│   ├── utils                  // 全局js
│   ├── ├── auth.js            // 用户授权js, getToken,setToken,removeToken
│   ├── ├── esresize.js        // echarts自适应js, 缩小浏览器时，echarts图标自适应
│   ├── ├── event-bus.js       // vue 事件总线js
│   ├── ├── variables.js       // 该js的用处在于，将 globle 对象中的变量进行导出,导出为全局变量
│   ├── views                  // 页面书写处
│   ├── App.vue                // 根组件
│   ├── main.js                // 入口文件 加载组件 初始化等
│   ├── permission.js          // 检测用户是否登录，以及token,全局路由守卫配置
├── .gitignore                 // git 忽略项
├── .browserslistrc            // 浏览器兼容的配置，用来指定项目的目标浏览器的范围
├── .babel.config.js           // 使用babel代码转码器时的配置
├── .env.development           // 开发环境请求路径配置
├── .env.production            // 生产环境请求路径配置
├── .eslintrc                  // eslint的配置文件
├── .editorconfig              // 简单的编码规范设置
├── .prettierrc.js             // 项目代码格式化规范
├── package-lock.json          // 用来记录当前状态下实际安装的各个npm package的具体来源和版本号
├── package.json               // 定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）
├── README.md                  // 项目介绍文件
└── vue.config.js              // 项目生产、开发配置
```
