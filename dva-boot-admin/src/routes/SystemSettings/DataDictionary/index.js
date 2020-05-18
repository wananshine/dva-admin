import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/DataDictionary',
  title: '数据字典',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
