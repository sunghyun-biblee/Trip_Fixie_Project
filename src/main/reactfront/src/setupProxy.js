const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://openapi.naver.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  )
  app.use(
    '/locapi',
    createProxyMiddleware({
      target: 'http://apis.data.go.kr',
      changeOrigin: true,
      pathRewrite:{
        '^/locapi': '',
      },
    })
  )
  app.use(
    createProxyMiddleware("/springapi", {
      target: "http://localhost:8080",
      changeOrigin: true,
      pathRewrite:{
        '^/springapi': '',
      },
    })
  );
}