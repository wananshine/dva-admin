import { createRoutes } from '@/utils/core';
import BasicLayout from '@/layouts/BasicLayout';
import UserLayout from '@/layouts/UserLayout';
import Login from './Login';


import Page403 from './Pages/403';
import Page500 from './Pages/500';
import NotFound from './Pages/404';
// import Blank from './Blank';


import DataManage from './DataManage';
import ProductionCard from './ProductionCard'
import WarehouseInput from './WarehouseInput';
import DataCheck from './DataCheck'
import TaskManage from './TaskManage'

//系统设置
import RulesManage from './SystemSettings/RulesManage';
import LocationInformation from './SystemSettings/LocationInformation';
import ProductionLinePosition from './SystemSettings/ProductionLinePosition';
import DataDictionary from './SystemSettings/DataDictionary';
import DataDictionaryDetail from './SystemSettings/DataDictionary/routers/Detail';

/**
 * 主路由配置
 * 
 * path 路由地址
 * component 组件
 * indexRoute 默认显示路由
 * childRoutes 所有子路由
 * NotFound 路由要放到最下面，当所有路由当没匹配到时会进入这个页面
 */
const routesConfig = app => [
    {
        path: '/sign',
        title: '登录',
        indexRoute: '/sign/login',
        component: UserLayout,
        childRoutes: [
            Login(app),
            // NotFound()
        ]
    },
    {
        path: '/',
        title: '系统中心',
        component: BasicLayout,
        indexRoute: '/data_source_manage',
        childRoutes: [
          ProductionCard(app),
          DataManage(app),
          WarehouseInput(app),
          DataCheck(app),
          TaskManage(app),
          RulesManage(app),
          LocationInformation(app),
            ProductionLinePosition(app),
          DataDictionary(app),
          DataDictionaryDetail(app),

          // Blank(app),
          Page403(),
          Page500(),
          NotFound()
        ]
    }
];

export default app => createRoutes(app, routesConfig);
