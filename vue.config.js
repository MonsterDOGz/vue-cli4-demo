/*
 * @Author: MonsterDOG
 * @Date: 2020-11-25 20:28:33
 * @LastEditors: MonsterDOG
 * @LastEditTime: 2021-03-13 14:39:14
 * @FilePath: /vue-cli4-demo/vue.config.js
 * @Description: 【描述】
 */
const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  // 打包后文件的引用路径
  publicPath: './',
  // 输出文件目录
  outputDir: 'dist',
  // webpack配置
  configureWebpack: {
    resolve: {
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': resolve('src'),
        '@api': resolve('src/request/modules')
      }
    }
  },
  css: {
    // css预处理器配置项
    loaderOptions: {
      sass: {
        // prependData: '@import \'~@/styles/index.scss\';'
      }
    }
  },
  // webpack-devServer 的配置，开发阶段配置
  devServer: {
    port: 6600, // 端口号
    open: true, // 是否在启动成功后直接打开页面
    // http 代理配置
    proxy: {
      // '/api/yifd': {
      //   target: 'http://192.168.10.191:8200',
      //   changeOrigin: true,
      //   pathRewrite: {
      //     '^/api/yifd': ''
      //   }
      // }
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:6600/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    before: require('./mock/mock-server.js')
  },
  // 插件配置
  pluginOptions: {
    svgSprite: {
      dir: 'src/icons/svg/',
      test: /\.(svg)(\?.*)?$/,
      loaderOptions: {
        extract: true,
        spriteFilename: 'icons.[hash:8].svg' // or 'img/icons.svg' if filenameHashing == false
      },
      pluginOptions: {
        plainSprite: true
      }
    }
  },
  // 用 configureWebpack 简单的配置；用 chainWebpack 做高级配置；包括对loader的添加，修改；以及插件的配置
  chainWebpack: config => {
    config.module.rules.delete('svg'); // 重点:删除默认配置中处理svg,
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('svg-sprite-loader')
      .test(/\.svg$/)
      .include.add(resolve('src/icons')) // 处理svg目录
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      });
  }
};
