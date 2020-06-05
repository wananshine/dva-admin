import $$ from 'cmn-utils';


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

//新增 产线位置信息
export async function ApiProductionLocUpdate(payload) {
    console.log('ApiProductionLocUpdate:',payload)
    return $$.post('/warehouse/loc', payload)
}



