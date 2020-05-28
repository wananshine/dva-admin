import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import {
    ApiDataDictList,
    ApiDataDictOptions,
    ApiDataDictSave,
    ApiDataDictUpdate,
    ApiDataDictDel
} from '../service'


/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'DataDictionary',

    state: {
        pageData: {},
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/data_dictionary';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            pageNum: 1,
                            pageSize: 10,
                            dictType: "",
                            dictLabel: "",
                            dictValue: ""
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
            const response = yield call(ApiDataDictList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataListSuccess',
                    payload: {
                        pageData: response,
                        options: options,
                        pageNum: 1,
                        pageSize: 10,
                        dictType: "",
                        dictLabel: "",
                        dictValue: ""
                    },
                });
            }

            const options = yield call(ApiDataDictOptions, payload);
            if(options && options.code === 200){
                yield put({
                    type: 'dataOptionsSuccess',
                    payload: {
                        options: options.data
                    },
                });
            }
            console.log('pageData:',response)
        },

        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {

            const response = yield call(ApiDataDictList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataListSuccess',
                    payload: {
                        ...payload,
                        pageData : response,
                        pageNum  : payload.pageNum,
                        pageSize : payload.pageSize
                    },
                });
            }
        },

        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {
            try {
                const response = yield call(ApiDataDictSave, payload);
                console.log('ApiDataDictSave',response, payload)
            } catch (e) {

            }
            const res = yield select(state => state.DataDictionary);


            yield put({
                type: 'getPageInfo',
                payload: res
            });
        },

        // 修改
        *update({ payload }, { call, put, select }) {
            try {
                const response = yield call(ApiDataDictUpdate, payload);

                console.log('ApiDataDictUpdate',response, payload);
                const res = yield select(state => state.DataDictionary);

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
                const response = yield call(ApiDataDictDel, payload);

                console.log('ApiDataDictDel',response, payload);
                const res = yield select(state => state.DataDictionary);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });

            } catch (e) {

            }

            // const records = payload;
            // const response = yield select(state => state.DataDictionary);
            // yield put({
            //     type: '@request',
            //     payload: {
            //         notice: true,
            //         url: `/warehouse/location/${payload}`,
            //         data: records
            //     }
            // });
            // yield put({
            //     type: 'getPageInfo',
            //     payload: response
            // });
            // success();
        },
    },

    reducers: {
        dataListSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize,
                dictType: payload.dictType,
                dictLabel: payload.dictLabel,
                dictValue: payload.dictValue
            };
        },
        dataOptionsSuccess(state, { payload }){
            return {
                ...state,
                options: payload.options,
            };
        }
    }
});