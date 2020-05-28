import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/warehouse_input',
  title: '仓库输入',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
