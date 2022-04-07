const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/user'], {
      target: 'http://3.34.189.123:8080/',
      changeOrigin: true
    })
  );
};
