import { routerRedux } from 'dva';
import { ApiDataProduct } from '../service';
import $$ from 'cmn-utils';
import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { ApiProductionLineInfo } from "../../SystemSettings/ProductionLinePosition/service";

let LOADED = false;
export default modelEnhance({
    namespace: 'DataProduct',

    state: {
        pageData: {},
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/production_card';
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
                        }
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
            const response = yield call(ApiDataProduct, payload);
            if(response && response && response.code === 200){
                yield put({
                    type: 'dataProductSuccess',
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

            const result = yield call(ApiProductionLineInfo, {
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

            const data = yield call(ApiProductionLineInfo, {
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
            const response = yield call(ApiDataProduct, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataProductSuccess',
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
        dataProductSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize,
                startDate: payload.startDate,
                endDate: payload.endDate,
                time: payload.time,
                partName: payload.partName,
                line: payload.line,
                lotNo: payload.lotNo
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