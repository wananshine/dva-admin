import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/ProductionLinePosition',
  title: '产线位置对应',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
