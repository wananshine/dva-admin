// https://facebook.github.io/create-react-app/docs/proxying-api-requests-in-development#configuring-the-proxy-manually
// https://github.com/chimurai/http-proxy-middleware

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    proxy('/api', {
        // target: 'http://10.0.0.119:8080/agv/',
        target: 'http://10.0.0.119:7777/agv/',
      // target: 'http://10.130.201.27:8080/',
      // target: 'http://10.130.201.27/dev-api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  );
  // app.use(
  //   proxy('/api', {
  //     target: 'http://aaa:1000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/api': ''
  //     }
  //   })
  // );
  // app.use(
  //   proxy('/xxx', {
  //     target: 'http://bbb:2000',
  //     changeOrigin: true,
  //     pathRewrite: {
  //       '^/xxx': ''
  //     }
  //   })
  // );
};
