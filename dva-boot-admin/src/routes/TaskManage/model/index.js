import modelEnhance from '@/utils/modelEnhance';
import { routerRedux } from 'dva';
import $$ from 'cmn-utils';
import {ApiTaskList, ApitaskSave, ApitaskUpdate, ApiTaskDel, ApiTaskOption, ApiTaskCancel} from '../service';
import { ApiLocationInfo } from "../../SystemSettings/LocInformation/service";



/**
 * 当第一次加载完页面时为true
 * 可以用这个值阻止切换页面时
 * 多次初始化数据
 */
let LOADED = false;
export default modelEnhance({
    namespace: 'TaskManageData',

    state: {
        pageData: [],
        employees: []
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
                const url = '/task_manage';
                if (pathname === url && !LOADED) {
                    LOADED = true;
                    dispatch({
                        type: 'init',
                        payload: {
                            pageNum: 1,
                            pageSize: 10,
                            startDate: new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString().replace(/\//g,"."),
                            endDate: new Date().toLocaleDateString().replace(/\//g,"."),
                            taskCode: '',
                            taskType: '',
                            taskLevel: ''
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
            const response = yield call(ApiTaskList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataTaskSuccess',
                    payload: {
                        ...payload,
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                        taskCode: payload.taskCode || '',
                        taskType: payload.taskType || '',
                        taskLevel: payload.taskLevel || ''
                    },
                });
            }

            const taskTypeResult = yield call(ApiTaskOption, {
                dictType: 'task_type',
                pageNum: '',
                pageSize: ''
            });
            if(taskTypeResult && taskTypeResult.code === 200){
                yield put({
                    type: 'dataTypeSuccess',
                    payload: {
                        ...payload,
                        typeOptions: taskTypeResult.rows,
                    },
                });
            }

            const taskLevelResult = yield call(ApiTaskOption, {
                dictType: 'task_level',
                pageNum: '',
                pageSize: ''
            });
            if(taskLevelResult && taskLevelResult.code === 200){
                yield put({
                    type: 'dataLevelSuccess',
                    payload: {
                        ...payload,
                        levelOptions: taskLevelResult.rows,
                    },
                });
            }

            const locResult = yield call(ApiLocationInfo, {
                pageNum: '',
                pageSize: ''
            });
            if(locResult && locResult.code === 200){
                yield put({
                    type: 'dataLocSuccess',
                    payload: {
                        ...payload,
                        locOptions: locResult.rows,
                    },
                });
            }

        },
        // 获取分页数据
        *getPageInfo({ payload }, { call, put }) {
            const response = yield call(ApiTaskList, payload);
            if(response && response.code === 200){
                yield put({
                    type: 'dataTaskSuccess',
                    payload: {
                        pageData: response,
                        pageNum: payload.pageNum,
                        pageSize: payload.pageSize,
                        startDate: payload.startDate || '',
                        endDate: payload.endDate || '',
                        taskCode: payload.taskCode || '',
                        taskType: payload.taskType || '',
                        taskLevel: payload.taskLevel || ''
                    },
                });
            }
        },
        // 保存 之后查询分页
        *save({ payload }, { call, put, select, take }) {

            try {
                const response = yield call(ApitaskSave, payload);
                console.log(response)
                const res = yield select(state => state.TaskManageData);
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
                const response = yield call(ApitaskUpdate, payload);
                console.log('update:',response);
                const res = yield select(state => state.TaskManageData);
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
                const response = yield call(ApiTaskDel, payload);
                console.log('ApiTaskDel',response, payload);
                const res = yield select(state => state.TaskManageData);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });

            } catch (e) {

            }
            // const { records, success } = payload;
            // const { pageData } = yield select(state => state.TaskManageData);
            // yield put({
            //     type: '@request',
            //     payload: {
            //         notice: true,
            //         url: '/TaskManageData/bathDelete',
            //         data: records.map(item => item.id)
            //     }
            // });
            // yield put({
            //     type: 'getPageInfo',
            //     payload: { pageData }
            // });
            // success();
        },

        //取消
        *cancel({ payload }, { call, put, select }){
            try {
                const response = yield call(ApiTaskCancel, payload);
                const res = yield select(state => state.TaskManageData);
                yield put({
                    type: 'getPageInfo',
                    payload: res
                });

            } catch (e) {

            }
        },

        // 获取员工列表
        *getEmployees({ payload }, { call, put }) {
            // yield put({
            //     type: '@request',
            //     afterResponse: resp => resp.data,
            //     payload: {
            //         valueField: 'employees',
            //         url: '/TaskManageData/getWorkEmployee'
            //     }
            // });
        }
    },

    reducers: {
        dataTaskSuccess(state, { payload }) {
            return {
                ...state,
                pageData: payload.pageData,
                pageNum: payload.pageNum,
                pageSize: payload.pageSize,
                startDate: payload.startDate || '',
                endDate: payload.endDate || '',
                taskCode: payload.taskCode || '',
                taskType: payload.taskType || '',
                taskLevel: payload.taskLevel || ''
            };
        },
        dataTypeSuccess(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        dataLevelSuccess(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
        dataLocSuccess(state, { payload }) {
            return {
                ...state,
                ...payload
            };
        },
    }
});
