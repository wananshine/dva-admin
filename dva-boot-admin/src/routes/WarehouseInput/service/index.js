import $$ from 'cmn-utils';

//

export async function ApiWareHouseList(payload) {
    console.log('payload:',payload)
    return $$.get(`/warehouse/input/list?startDate=${payload.startDate}&endDate=${payload.endDate}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

export async function ApiWareHouseUpdate(payload) {
    console.log('payload:',payload)
    return $$.post('/warehouse/input', payload)
}