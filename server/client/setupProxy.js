const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware(['/api', '/user'], {
      target: 'http://52.78.43.223:8080/',
      changeOrigin: true
    })
  );
};
