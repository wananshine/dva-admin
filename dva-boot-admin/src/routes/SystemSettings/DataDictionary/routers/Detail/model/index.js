import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import {
    ApiDataDictDetail
} from '../../../service'


/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'DataDictDetail',

    state: {
    },

    subscriptions: {
        setup({ dispatch, history }) {
            console.log('history.search:', history.location.search);


            history.listen(({ pathname }) => {

                const getQueryString = (name) => {
                    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
                    const r = history.location.search.substr(1).match(reg);
                    if (r != null) {
                        return unescape(r[2]);
                    }
                    return null;
                };
                let dictCode = getQueryString('id');
                const url = '/data_dictionary/detail';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            dictCode: dictCode,
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
            LOADED = false;
            const response = yield call(ApiDataDictDetail, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataDetailSuccess',
                    payload: response.data
                });
            }
        },

        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {

        },

        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {

        },

        // 修改
        *update({ payload }, { call, put, select }) {

        },

        // 删除 之后查询分页
        *remove({ payload }, { call, put, select }) {

        },
    },

    reducers: {
        dataDetailSuccess(state, { payload }) {
            return {
                ...state,
                dictInfo: payload
            };
        },
    }
});