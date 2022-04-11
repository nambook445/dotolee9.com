const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/user'], {
      target: 'http://dotolee9.com:8080/',
      changeOrigin: true
    })
  );
};
