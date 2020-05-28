import $$ from 'cmn-utils';

export default Common({

    namespace: 'common',

    state: {
    },

    effects: {
        *getCode({ payload }, { call, put }) {

        },
    },

    reducers: {
        getMenuSuccess(state, { payload }) {
            return {
                ...state
            };
        }
    },
});

//产线信息
export async function ApiPicLineInfo(payload) {
    console.log('产线信息ApiPicLineInfo:',payload);
    return $$.get(`/system/dict/data/list?dictType=${payload.dictType}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}