const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
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
