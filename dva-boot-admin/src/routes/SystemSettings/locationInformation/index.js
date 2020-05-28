import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/location_information',
  title: '位置信息',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
