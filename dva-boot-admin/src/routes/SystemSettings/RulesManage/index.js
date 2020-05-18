import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/RulesManage',
  title: '权限管理',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
