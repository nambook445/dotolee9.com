const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/user'], {
      target: 'http://3.38.59.97:8080/',
      changeOrigin: true
    })
  );
};
