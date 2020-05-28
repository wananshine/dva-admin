import $$ from 'cmn-utils';

export async function ApiDataManage(payload) {
    return $$.get(`/warehouse/data/list?startDate=${payload.startDate}&endDate=${payload.endDate}&time=${payload.time}&partName=${payload.partName}&line=${payload.line}&lotNo=${payload.lotNo}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`);
}

//品名
export async function ApiParNameOptions(payload) {
    console.log('payload:',payload)
    return $$.get(`/warehouse/input/listCheckData?startDate=${payload.startDate}&endDate=${payload.endDate}&time=${payload.time}&partName=${payload.partName}&line=${payload.line}&lotNo=${payload.lotNo}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

//lotNo
export async function ApiLotNoOptions(payload) {
    console.log('payload:',payload)
    return $$.get(`/warehouse/input/listCheckData?startDate=${payload.startDate}&endDate=${payload.endDate}&time=${payload.time}&partName=${payload.partName}&line=${payload.line}&lotNo=${payload.lotNo}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}