import modelEnhance from '@/utils/modelEnhance';
import $$ from 'cmn-utils';
import { ApiCheckList } from "../service";
import { ApiLineInfo } from "../../SystemSettings/LineInformation/service";


/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'dataCheck',

    state: {
        pageData: [],
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/data_check';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            pageNum: 1,
                            pageSize: 10,
                            startDate: new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString().replace(/\//g,"."),
                            endDate: new Date().toLocaleDateString().replace(/\//g,"."),
                            time: '',
                            partName: '',
                            line: '',
                            lotNo: ''
                        },
                    });
                }else if(pathname !== url){
                    LOADED = false;
                }
            });
        }
    },

    effects: {
        // 进入页面加载
        *init({ payload }, { call, put, select }) {
            const response = yield call(ApiCheckList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataCheckSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                        partName: payload.partName || '',
                        line: payload.line || '',
                        time:  payload.time || '',
                        lotNo:  payload.lotNo || ''
                    },
                });
            }

            const result = yield call(ApiLineInfo, {
                dictType: 'warehouse_line',
                pageNum: '',
                pageSize: ''
            });
            if(result && result.code === 200){
                yield put({
                    type: 'dataLineSuccess',
                    payload: {
                        lineOptions: result.rows,
                        lineTotal: result.total
                    },
                });
            }

            const data = yield call(ApiLineInfo, {
                dictType: 'warehouse_partName',
                pageNum: '',
                pageSize: ''
            });
            if(data && data.code === 200){
                yield put({
                    type: 'dataPartNameSuccess',
                    payload: {
                        pNameOptions: data.rows,
                        pNameTotal: data.total
                    },
                });
            }
        },
        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            const response = yield call(ApiCheckList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataCheckSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum || 1,
                        pageSize: payload.pageSize || 10,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                        partName: payload.partName || '',
                        line: payload.line || '',
                        time:  payload.time || '',
                        lotNo:  payload.lotNo || ''
                    },
                });
            }
        },

        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {

            // try {
            //     const response = yield call(ApiWareHouseSave, payload);
            //     console.log(response)
            //     const res = yield select(state => state.warehouse);
            //     yield put({
            //         type: 'getPageInfo',
            //         payload: res
            //     });
            // } catch (e) {
            //
            // }
        },

        // 修改
        *update({ payload }, { call, put, select }) {
            // try {
            //     const response = yield call(ApiWareHouseUpdate, payload);
            //     console.log('update:',response);
            //     const res = yield select(state => state.warehouse);
            //     yield put({
            //         type: 'getPageInfo',
            //         payload: res
            //     });
            //
            //
            // } catch (e) {
            //
            // }
        },
        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {

            // try {
            //     const response = yield call(ApiWareHouseDel, payload);
            //     console.log('ApiWareHouseDel',response, payload);
            //     const res = yield select(state => state.warehouse);
            //     yield put({
            //         type: 'getPageInfo',
            //         payload: res
            //     });
            //
            // } catch (e) {
            //
            // }
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
        dataCheckSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize,
                partName: payload.partName || '',
                line: payload.line || '',
                lotNo: payload.lotNo || '',
                startDate: payload.startDate || '',
                endDate: payload.endDate || '',
                time: payload.time || ''

            };
        },
        dataLineSuccess(state, { payload }) {
            return {
                ...state,
                lineData: payload
            };
        },
        dataPartNameSuccess(state, { payload }){
            return {
                ...state,
                pNameData: payload
            };
        }
    }
});