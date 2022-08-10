module.exports = {
  env: {
    NODE_ENV: '"production"',
  },
  defineConstants: {
    // uat用于小程序预览环境
    //API_ENDPOINT_UAT: '"https://xgn-gateway-uat.fuzfu.net/"',
    API_ENDPOINT_UAT: '"https://xgn-gateway.fuzfu.net/"',
    API_ENDPOINT: '"https://xgn-gateway.fuzfu.net/"',
  },
  mini: {},
  h5: {
    /**
     * WebpackChain 插件配置
     * @docs https://github.com/neutrinojs/webpack-chain
     */
    webpackChain (chain) {
      /**
       * 如果 h5 端编译后体积过大，可以使用 webpack-bundle-analyzer 插件对打包体积进行分析。
       * @docs https://github.com/webpack-contrib/webpack-bundle-analyzer
       */
      // chain.plugin('analyzer')
        // .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, [])

      /**
       * 如果 h5 端首屏加载时间过长，可以使用 prerender-spa-plugin 插件预加载首页。
       * @docs https://github.com/chrisvfritz/prerender-spa-plugin
       */
      const path = require('path')
      const Prerender = require('prerender-spa-plugin')
      const staticDir = path.join(__dirname, '..', 'dist')
      chain
        .plugin('prerender')
        .use(new Prerender({
          staticDir,
          routes: [ '/pages/jobList/jobList' ],
          postProcess: (context) => ({ ...context, outputPath: path.join(staticDir, 'index.html') })
        }))
    }
  }
}
