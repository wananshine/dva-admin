import { routerRedux } from 'dva';
import { ApiDataManage } from '../service';
import $$ from 'cmn-utils';
import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';

let LOADED = false;
export default modelEnhance({
    namespace: 'DataSourceManage',

    state: {
        pageData: {},
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/DataSourceManage' && !LOADED) {
                    dispatch({
                        type: 'init',
                        payload: {
                            pageNum: 1,
                            pageSize: 10,
                            startDate: '',
                            endDate: '',
                            time: '',
                            partName: '',
                            line: '',
                            lotNo: ''
                        },
                    });
                    LOADED = true;
                }
            });
        }
    },

    effects: {
        // 进入页面加载
        *init({ payload }, { call, put, select }) {
            try {
                const response = yield call(ApiDataManage, payload);
                if(response && response.code === 200){
                    yield put({
                        type: 'dataManageSuccess',
                        payload: {
                            pageData: response,
                            pageNum: 1,
                            pageSize: 10,
                            startDate: '',
                            endDate: '',
                            time: '',
                            partName: '',
                            line: '',
                            lotNo: ''
                        },
                    });
                }
                console.log('pageData:',response)
            } catch (e) {
                console.log(e)
            }

            // yield put({
            //     type: 'getPageInfo',
            //     payload: {
            //         pageData: pageData.startPage(1, 10)
            //     }
            // });
            // yield put({
            //     type: 'getEmployees'
            // });
        },
        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            const response = yield call(ApiDataManage, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataManageSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                        time: payload.time || '',
                        partName: payload.partName || '',
                        line: payload.line || '',
                        lotNo: payload.lotNo || ''
                    },
                });
            }

            // yield put({
            //     type: '@request',
            //     payload: {
            //         valueField: 'pageData',
            //         url: '/crud/getList',
            //         pageInfo: pageData
            //     }
            // });
        },
        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {
            const { values, success } = payload;
            const { pageData } = yield select(state => state.crud);
            // put是非阻塞的 put.resolve是阻塞型的
            yield put.resolve({
                type: '@request',
                payload: {
                    notice: true,
                    url: '/crud/save',
                    data: values
                }
            });

            yield put({
                type: 'getPageInfo',
                payload: { pageData }
            });
            success();
        },
        // 修改
        *update({ payload }, { call, put }) {},
        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {
            const { records, success } = payload;
            const { pageData } = yield select(state => state.crud);
            yield put({
                type: '@request',
                payload: {
                    notice: true,
                    url: '/crud/bathDelete',
                    data: records.map(item => item.id)
                }
            });
            yield put({
                type: 'getPageInfo',
                payload: { pageData }
            });
            success();
        },
        // 获取员工列表
        *getEmployees({ payload }, { call, put }) {
            yield put({
                type: '@request',
                afterResponse: resp => resp.data,
                payload: {
                    valueField: 'employees',
                    url: '/crud/getWorkEmployee'
                }
            });
        }
    },

    reducers: {
        dataManageSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize,
                startDate: payload.startDate || '',
                endDate: payload.endDate || '',
                time: payload.time || '',
                partName: payload.partName || '',
                line: payload.line || '',
                lotNo: payload.lotNo || ''
            };
        },
    }
});