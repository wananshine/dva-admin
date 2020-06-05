import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/line_information',
  title: '产线信息',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
