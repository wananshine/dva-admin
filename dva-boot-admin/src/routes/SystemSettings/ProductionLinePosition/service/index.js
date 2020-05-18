import $$ from 'cmn-utils';


//获取产线信息
export async function ApiProductionLineInfo(payload) {
    console.log('ApiProductionLineInfo:',payload)
    return $$.get(`/system/dict/data/list?dictType=${payload.dictType}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

//新增产线信息
export async function ApiProductionLineUpdate(payload) {
    console.log('ApiProductionLineUpdate:',payload)
    return $$.post('/system/dict/data', payload)
}

//产线位置信息
export async function ApiProductionLineLocInfo(payload) {
    console.log('payload:',payload)
    return $$.get('/warehouse/loc/list')
}

//新增产线位置信息
export async function ApiProductionLocUpdate(payload) {
    console.log('ApiProductionLocUpdate:',payload)
    return $$.post('/warehouse/loc', payload)
}



