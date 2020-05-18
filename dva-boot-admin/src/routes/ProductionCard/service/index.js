import $$ from 'cmn-utils';

export async function ApiDataProduct(payload) {
    return $$.get(`/warehouse/data/list?startDate=${payload.startDate}&endDate=${payload.endDate}&time=${payload.time}&partName=${payload.partName}&line=${payload.line}&lotNo=${payload.lotNo}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`);}