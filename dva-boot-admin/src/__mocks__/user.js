import ProductionLinePosition from "../routes/SystemSettings/ProductionLinePosition";

/**
 * 模拟请求数据
 * @param {FetchMock} fetchMock 当现有条件不满足时，可以使用fetchMock来进行扩展
 * @param {function} delay 增加延迟时间 ms 例: delay(mockData) 或 delay(mockData, 200)
 * @param {function} mock 使用mock生成数据，例:

   mock({
     'string|1-10': '★' // 生成最少1颗，最多10颗星字符
   })

   // {'string': '★★★★★★'} 

  更多用法参考 http://mockjs.com/examples.html
 */
export default ({fetchMock, delay, mock, toSuccess, toError}) => {
  // 如果现有扩展不满足需求，可以直接使用fetchMock方法
  // fetchMock.mock(/httpbin.org\/post/, {/* response */}, {/* options */});

  return {
    '/api/user/login': (options) => {
        console.log('options:', options)
        if (options.body) {

        } else {
            return toError('请输入用户名和密码');
        }
    },
    '/api/user/register': options => toSuccess(),
    '/api/user/menu': options => toSuccess([
	{
          name: '数据源管理',
          icon: 'DeploymentUnitOutlined',
          path: '/DataSourceManage',
      },
      {
          name: '生产看板',
          icon: 'ReconciliationOutlined',
          path: '/ProductionCard',
      },
      {
          name: '仓库输入',
          icon: 'FormOutlined',
          path: '/WarehouseInput'
      },
      {
        name: '数据检查',
        icon: 'FundViewOutlined',
        path: '/DataCheck'
      },
      {
          name: '任务管理',
          icon: 'AuditOutlined',
          path: '/TaskManage'
      },
      {
          name: '系统设置',
          icon: 'SettingOutlined',
          path: '/SystemSettings',
          children: [
              {
                  name: '权限管理',
                  icon: 'LockOutlined',
                  path: '/RulesManage',
              },
              {
                  name: '数据字典',
                  icon: 'BoxPlotOutlined',
                  path: '/DataDictionary',
              },
              {
                  name: '位置信息',
                  icon: 'EnvironmentOutlined',
                  path: '/LocationInformation',
              },
              {
                  name: '产线位置对应',
                  icon: 'BoxPlotOutlined',
                  path: '/ProductionLinePosition',
              }
          ],
      }
    ], 400)
  } 
}