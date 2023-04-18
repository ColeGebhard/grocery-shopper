const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://acl-groceries.onrender.com',
      changeOrigin: true,
    })
  );
};
