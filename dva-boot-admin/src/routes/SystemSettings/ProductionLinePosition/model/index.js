import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import { ApiProductionLineUpdate, ApiProductionLocUpdate, ApiProductionLineInfo, ApiProductionLineLocInfo } from '../service'


/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'productLine',

    state: {
        pageData: {},
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/ProductionLinePosition' && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            dictType: 'warehouse_line',
                            pageNum: 1,
                            pageSize: 10
                        }
                    });
                }
            });
        }
    },

    effects: {
        // 进入页面加载
        *init({ payload }, { call, put, select }) {
            const response = yield call(ApiProductionLineInfo, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataProductLineSuccess',
                    payload: {
                        proLine: {
                            pageData: response,
                            dictType: 'warehouse_line',
                            pageNum: 1,
                            pageSize: 10
                        }
                    },
                });

                const res = yield call(ApiProductionLineLocInfo, payload);
                if(res && res.code===200){
                    yield put({
                        type: 'dataProductLocSuccess',
                        payload: {
                            proLoc: {
                                pageData: res,
                                pageNum: 1,
                                pageSize: 10
                            }
                        },
                    });
                }

            }
        },

        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            // const { pageData } = payload;
            // yield put({
            //     type: '@request',
            //     payload: {
            //         valueField: 'pageData',
            //         url: '/warehouse/getList',
            //         pageInfo: pageData
            //     }
            // });
        },

        // 保存Loc 之后查询分页
        *save({ payload }, { call, put, select, take }) {
            try {
                const response = yield call(ApiProductionLocUpdate, payload);
                console.log('save',response)
            } catch (e) {

            }

            // const { values, success } = payload;
            // const { pageData } = yield select(state => state.warehouse);
            // // put是非阻塞的 put.resolve是阻塞型的
            // yield put.resolve({
            //     type: '@request',
            //     payload: {
            //         notice: true,
            //         url: '/warehouse/save',
            //         data: values
            //     }
            // });
            //
            // yield put({
            //     type: 'getPageInfo',
            //     payload: { pageData }
            // });
            // success();
        },

        // 保存Line 之后查询分页
        *keep({ payload }, { call, put, select, take }) {
            try {
                const response = yield call(ApiProductionLineUpdate, payload);
                console.log('keep',response)
            } catch (e) {

            }

            // const { values, success } = payload;
            // const { pageData } = yield select(state => state.warehouse);
            // // put是非阻塞的 put.resolve是阻塞型的
            // yield put.resolve({
            //     type: '@request',
            //     payload: {
            //         notice: true,
            //         url: '/warehouse/save',
            //         data: values
            //     }
            // });
            //
            // yield put({
            //     type: 'getPageInfo',
            //     payload: { pageData }
            // });
            // success();
        },

        // 修改
        *update({ payload }, { call, put }) {
        },

        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {
            const { records, success } = payload;
            const { pageData } = yield select(state => state.warehouse);
            yield put({
                type: '@request',
                payload: {
                    notice: true,
                    url: '/warehouse/bathDelete',
                    data: records.map(item => item.id)
                }
            });
            yield put({
                type: 'getPageInfo',
                payload: { pageData }
            });
            success();
        },
    },

    reducers: {
        dataProductLineSuccess(state, { payload }) {
            return {
                ...state,
                proLine: payload.proLine
            };
        },
        dataProductLocSuccess(state, { payload }) {
            return {
                ...state,
                proLoc: payload.proLoc
            };
        },
    }
});