import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/data_dictionary',
  title: '数据字典',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  exact: true
});

export default app => createRoute(app, routesConfig);
