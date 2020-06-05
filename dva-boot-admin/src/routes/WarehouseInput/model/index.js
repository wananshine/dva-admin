import modelEnhance from '@/utils/modelEnhance';
import PageHelper from '@/utils/pageHelper';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import { ApiWareHouseList, ApiWareHouseSave, ApiWareHouseUpdate, ApiWareHouseDel } from '../service';
import { ApiLocInfo, ApiProductionLineLoc2Info} from "../../SystemSettings/ProLinePosition/service";
import { ApiLineInfo } from "../../SystemSettings/LineInformation/service";


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
                const url = '/warehouse_input';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            pageNum: 1,
                            pageSize: 10,
                            startDate: new Date().toLocaleDateString().replace(/\//g,"."),
                            endDate: new Date().toLocaleDateString().replace(/\//g,"."),
                            partName: '',
                            line: '',
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
                        partName: payload.partName || '',
                        line: payload.line || '',
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
                })
            }

            const data = yield call(ApiLineInfo , {
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
                        partName: payload.partName || '',
                        line: payload.line || '',
                    },
                });
            }
        },
        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {

            try {
                const response = yield call(ApiWareHouseSave, payload);
                console.log(response)
                const res = yield select(state => state.warehouse);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });
            } catch (e) {

            }
        },

        // 修改
        *update({ payload }, { call, put, select }) {
            try {
                const response = yield call(ApiWareHouseUpdate, payload);
                console.log('update:',response);
                const res = yield select(state => state.warehouse);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });


            } catch (e) {

            }
        },
        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {

            try {
                const response = yield call(ApiWareHouseDel, payload);
                console.log('ApiWareHouseDel',response, payload);
                const res = yield select(state => state.warehouse);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });

            } catch (e) {

            }
            // const { records, success } = payload;
            // const { pageData } = yield select(state => state.warehouse);
            // yield put({
            //     type: '@request',
            //     payload: {
            //         notice: true,
            //         url: '/warehouse/bathDelete',
            //         data: records.map(item => item.id)
            //     }
            // });
            // yield put({
            //     type: 'getPageInfo',
            //     payload: { pageData }
            // });
            // success();
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
        },

        //Line 联动
        *getLines({ payload }, { call, put }){

            try {
                const response = yield call(ApiProductionLineLoc2Info, payload);
                if(response && response.code === 200){
                    yield put({
                        type: 'dataLocSuccess',
                        payload: {
                            ...payload,
                            locOptions: response.rows,
                        },
                    });
                }

            } catch (e) {

            }
            //
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
                partName: payload.partName || '',
                line: payload.line || '',
            };
        },
        dataLineSuccess(state, { payload }) {
            return {
                ...state,
                lineData: payload
            };
        },
        dataLocSuccess(state, { payload }) {
            return {
                ...state,
                ...payload
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
