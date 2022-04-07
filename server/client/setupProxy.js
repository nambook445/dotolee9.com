const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://3.34.189.123/',
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware('/user', {
      target: 'http://3.34.189.123/',
      changeOrigin: true
    })
  );
};
