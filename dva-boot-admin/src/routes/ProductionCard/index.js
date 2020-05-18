import { dynamicWrapper, createRoute } from '@/utils/core';

const routesConfig = app => ({
  path: '/ProductionCard',
  title: '生产看板',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default app => createRoute(app, routesConfig);
