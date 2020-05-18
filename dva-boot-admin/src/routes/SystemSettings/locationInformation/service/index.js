import $$ from 'cmn-utils';

export async function ApiLocationInfo(payload) {
    console.log('payload:',payload);
    return $$.get('/warehouse/location/list?pageNum='+ payload.pageNum +'&pageSize=' + payload.pageSize)
}

export async function ApiLocationSave(payload) {
    console.log('payload:',payload);
    return $$.post('/warehouse/location', payload)
}

export async function ApiLocationUpdate(payload) {
    console.log('payload:',payload);
    return $$.put('/warehouse/location', payload)
}

export async function ApiLocationDel(payload) {
    console.log('$$:',$$);
    return $$.del(`/warehouse/location/${payload.locationId}`)
}



