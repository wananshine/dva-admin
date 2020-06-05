import $$ from 'cmn-utils';

//产线信息
export async function ApiLineInfo(payload) {
    console.log('产线列表:',payload);
    return $$.get(`/system/dict/data/list?dictType=${payload.dictType}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

//新增产线信息
export async function ApiLineSave(payload) {
    console.log('新增产线:',payload);
    return $$.post('/system/dict/data', payload)
}



