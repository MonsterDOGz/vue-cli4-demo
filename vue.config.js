const path = require('path');
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
        '@': path.resolve('src')
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
      '/api': {
        target: 'http://192.168.11.31:9101',
        changeOrigin: true,
        pathRewrite: {
          '^/api/yifd': ''
        }
      }
    }
  }
};
