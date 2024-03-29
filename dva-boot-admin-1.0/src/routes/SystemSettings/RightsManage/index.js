import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
  path: '/RightsManage',
  title: 'CRUD示例',
  component: dynamicWrapper(app, [import('./model')], () => import('./components')),
  exact: true
});

export default (app) => createRoute(app, routesConfig);
