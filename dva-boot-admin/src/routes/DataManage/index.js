import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/DataSourceManage',
  title: '数据源管理',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
