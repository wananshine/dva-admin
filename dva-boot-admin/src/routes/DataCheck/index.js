import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/data_check',
  title: '数据检查',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
