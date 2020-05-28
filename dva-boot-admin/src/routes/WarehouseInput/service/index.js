import $$ from 'cmn-utils';

//仓库输入列表
export async function ApiWareHouseList(payload) {
    console.log('payload:',payload);
    return $$.get(`/warehouse/input/list?startDate=${payload.startDate}&endDate=${payload.endDate}&line=${payload.line}&partName=${payload.partName}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

//新增仓库输入
export async function ApiWareHouseSave(payload) {
    console.log('payload:',payload)
    return $$.post('/warehouse/input', payload)
}

//仓库输入修改
export async function ApiWareHouseUpdate(payload) {
    console.log('payload:',payload)
    return $$.put('/warehouse/input', payload)
}

//仓库输入删除
export async function ApiWareHouseDel(payload) {
    console.log('payload:',payload)
    return $$.del(`/warehouse/input/${payload.warehouseInputId}`)
}