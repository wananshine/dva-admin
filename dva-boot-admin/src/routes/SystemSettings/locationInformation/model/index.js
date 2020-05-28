import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import { ApiLocationInfo, ApiLocationSave, ApiLocationUpdate, ApiLocationDel } from '../service'


/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'LocationInformation',

    state: {
        pageData: {},
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/location_information';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            pageNum: 1,
                            pageSize: 10,
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
            const response = yield call(ApiLocationInfo, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataLocationSuccess',
                    payload: {
                        pageData: response,
                        pageNum: 1,
                        pageSize: 10
                    },
                });
            }else{

            }
            console.log('pageData:',response)
        },
        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {

            const response = yield call(ApiLocationInfo, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataLocationSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,

                    },
                });
            }

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
        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {
            try {
                const response = yield call(ApiLocationSave, payload);
                console.log('ApiLocationSave',response, payload)
            } catch (e) {

            }
            const res = yield select(state => state.LocationInformation);
            // put是非阻塞的 put.resolve是阻塞型的
            // yield put.resolve({
            //     type: '@request',
            //     payload: {
            //         notice: true,
            //         url: '/LocationInformation/save',
            //         data: res
            //     }
            // });

            yield put({
                type: 'getPageInfo',
                payload: res
            });
            // success();
        },

        // 修改
        *update({ payload }, { call, put, select }) {
            try {
                const response = yield call(ApiLocationUpdate, payload);
                const res = yield select(state => state.LocationInformation);
                console.log('select:',res)
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
                const response = yield call(ApiLocationDel, payload);

                console.log('ApiLocationDel',response, payload);
                const res = yield select(state => state.LocationInformation);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });

            } catch (e) {

            }

            // const records = payload;
            // const response = yield select(state => state.LocationInformation);
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
        dataLocationSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize
            };
        },
    }
});