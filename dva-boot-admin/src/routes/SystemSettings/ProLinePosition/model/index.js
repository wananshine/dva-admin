import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import {
    ApiProductionLocUpdate,
    ApiProductionLineLocInfo,
    ApiProductionLineLoc2Info
} from '../service'
import { ApiLocationInfo } from "../../LocInformation/service";
/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'productLine',

    state: {
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/production_line_position';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            dictType: 'warehouse_line',
                            pageNum: 1,
                            pageSize: 10
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
            const result = yield call(ApiLocationInfo, payload);
            if(result && result.code===200){
                yield put({
                    type: 'dataLocSuccess',
                    payload: {
                        pageData: result,
                        pageNum: 1,
                        pageSize: 10
                    },
                });
            }

            const response = yield call(ApiProductionLineLocInfo, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataLineSuccess',
                    payload: {
                        pageData: response,
                        dictType: 'warehouse_line',
                        pageNum: 1,
                        pageSize: 10
                    },
                });
            }
        },

        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            console.log(payload);
            const res = yield call(ApiLocationInfo, payload);
            if(res && res.code===200){
                yield put({
                    type: 'dataLocSuccess',
                    payload: {
                        ...payload,
                        pageData: res
                    },
                });
            }
        },

        //查询左侧位置信息2
        *getPageInfo2({ payload }, { call, put, select }){
            const response = yield call(ApiProductionLineLoc2Info, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataLocKeySuccess',
                    payload: {
                        selectKeys: response,
                        lineId: payload.lineId,
                    },
                });
            }
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
        dataLineSuccess(state, { payload }) {
            return {
                ...state,
                proLine: payload
            };
        },
        dataLocSuccess(state, { payload }) {
            return {
                ...state,
                proLoc: {...payload}
            };
        },
        dataLocKeySuccess(state, { payload }) {
            return {
                ...state,
                proLocSelectedKeys: payload
            };
        },
    }
});