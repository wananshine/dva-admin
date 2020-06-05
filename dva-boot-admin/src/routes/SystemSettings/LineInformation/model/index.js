import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import {
    ApiLineInfo,
    ApiLineSave
} from '../service'
import {ApiLocationInfo} from "../../LocInformation/service";

/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({

    namespace: 'LineInformation',

    state: {
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/line_information';
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

            const response = yield call(ApiLineInfo, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataLineListSuccess',
                    payload: {
                        dictType: 'warehouse_line',
                        pageData: response.rows,
                        total: response.total,
                        pageNum: 1,
                        pageSize: 10
                    },
                });
            }
        },

        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            const response = yield call(ApiLineInfo, { ...payload, dictType: 'warehouse_line'});
            if(response && response.code === 200){
                yield put({
                    type: 'dataLineListSuccess',
                    payload: {
                        dictType: 'warehouse_line',
                        pageData: response.rows,
                        total: response.total,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                    }
                });
            }
        },

        // 保存Loc 之后查询分页
        *save({ payload }, { call, put, select, take }) {
            try {
                const response = yield call(ApiLineSave, { ...payload, dictType: 'warehouse_line'});
                console.log('save',response)
            } catch (e) {

            }
            const res = yield select(state => state.LineInformation);
            yield put({
                type: 'getPageInfo',
                ...res
            });
        },

        // 修改
        *update({ payload }, { call, put }) {
        },

        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {

        },


    },

    reducers: {
        dataLineListSuccess(state, { payload }) {
            return {
                ...state,
                ...payload,
            };
        }
    }
});