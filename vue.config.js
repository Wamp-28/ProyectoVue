const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
  
})
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: process.env.PORT || 3000
  },
  publicPath: './'
});


