import $$ from 'cmn-utils';

//数据检查
export async function ApiCheckList(payload) {
    console.log('payload:',payload)
    return $$.get(`/warehouse/input/listCheckData?startDate=${payload.startDate}&endDate=${payload.endDate}&time=${payload.time}&partName=${payload.partName}&line=${payload.line}&lotNo=${payload.lotNo}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

