const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://backend-twlrpkz6xa-ey.a.run.app',
      changeOrigin: true,
    })
  );
};
