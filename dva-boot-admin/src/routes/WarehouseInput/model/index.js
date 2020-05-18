import { routerRedux } from 'dva';
import { ApiWareHouseList, ApiWareHouseUpdate } from '../service';
import $$ from 'cmn-utils';
import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';


/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'warehouse',

    state: {
        pageData: PageHelper.create(),
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                if (pathname === '/WarehouseInput' && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            pageData: [],
                            pageNum: 1,
                            pageSize: 10,
                            startDate: '',
                            endDate: ''
                        },
                    });
                }
            });
        }
    },

    effects: {
        // 进入页面加载
        *init({ payload }, { call, put, select }) {
            console.log('payload:',payload);
            const response = yield call(ApiWareHouseList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataWarehouseSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                    },
                });
            }
        },
        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            const response = yield call(ApiWareHouseList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataWarehouseSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                    },
                });
            }
        },
        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {

            try {
                const response = yield call(ApiWareHouseUpdate, payload);
                console.log(response)
            } catch (e) {

            }
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
        // 获取员工列表
        *getEmployees({ payload }, { call, put }) {
            // yield put({
            //     type: '@request',
            //     afterResponse: resp => resp.data,
            //     payload: {
            //         valueField: 'employees',
            //         url: '/warehouse/getWorkEmployee'
            //     }
            // });
        }
    },

    reducers: {
        dataWarehouseSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize,
                startDate: payload.startDate || '',
                endDate: payload.endDate || '',
            };
        },
    }
});
