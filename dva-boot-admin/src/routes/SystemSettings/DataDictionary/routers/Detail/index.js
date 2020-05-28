import {dynamicWrapper, createRoute} from '@/utils/core';

const routesConfig = (app) => ({
  path: '/data_dictionary/detail',
  title: '数据字典详情',
  component: dynamicWrapper(app, [import('./model')], () => import('./components'))
});

export default (app) => createRoute(app, routesConfig);
