import $$ from 'cmn-utils';

//位置信息
export async function ApiLocInfo(payload) {
    console.log('位置信息:',payload);
    return $$.get('/warehouse/location/list?pageNum='+ payload.pageNum +'&pageSize=' + payload.pageSize)
}

//产线信息
export async function ApiProductionLineInfo(payload) {
    console.log('产线信息:',payload)
    return $$.get(`/system/dict/data/list?dictType=${payload.dictType}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

//新增产线信息
export async function ApiProductionLineUpdate(payload) {
    console.log('ApiProductionLineUpdate:',payload)
    return $$.post('/system/dict/data', payload)
}

//产线位置信息
export async function ApiProductionLineLocInfo(payload) {
    console.log('产线位置信息:',payload);
    return $$.get('/warehouse/loc/list')
}

//产线位置信息2
export async function ApiProductionLineLoc2Info(payload) {
    console.log('产线位置信息2:',payload)
    return $$.get(`/warehouse/loc/list2?lineId=${payload.lineId}`)
}

//新增产线位置信息
export async function ApiProductionLocUpdate(payload) {
    console.log('ApiProductionLocUpdate:',payload)
    return $$.post('/warehouse/loc', payload)
}



