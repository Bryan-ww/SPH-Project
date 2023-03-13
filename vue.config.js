const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // 取消打包map文件
  productionSourceMap:false,
  transpileDependencies: true,
  // 关闭eslint校验工具
  lintOnSave:false,
  devServer: {
    host: 'local-ip',
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn',
        ws: true,
        changeOrigin: true
      },
    }
  }
})
