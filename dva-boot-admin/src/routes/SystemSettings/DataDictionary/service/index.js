import $$ from 'cmn-utils';

//字典列表
export async function ApiDataDictTypeList(payload) {
    console.log('payload:',payload);
    return $$.get('/system/dict/data/list?pageNum='+ payload.pageNum +'&pageSize=' + payload.pageSize)
}

//  字典类型详细信息
export async function ApiDataDictTypeInfo(payload) {
    console.log('$$:',$$);
    return $$.get(`/system/dict/type/${payload.id}`)
}

//  新增字典类型
export async function ApiDataDictTypeSave(payload) {
    console.log('$$:',$$);
    return $$.post('/system/dict/type', payload)
}

//  字典类型修改
export async function ApiDataDictTypeUpdate(payload) {
    console.log('$$:',$$);
    return $$.put('/system/dict/type', payload)
}

//  字典类型删除
export async function ApiDataDictTypeDel(payload) {
    console.log('$$:',$$);
    return $$.del(`/system/dict/type/${payload.id}`)
}

//  获取字典选择框列表
export async function ApiDataDictOptions(payload) {
    console.log('$$:',$$);
    return $$.get('/system/dict/type/optionselect')
}

//数据字典信息
export async function ApiDataDictList(payload) {
    console.log('$$:',$$);
    return $$.get('/system/dict/data/list?pageNum='+ payload.pageNum +'&pageSize=' + payload.pageSize)
}

//数据字典详细信息
export async function ApiDataDictDetail(payload) {
    console.log('$$:',$$);
    return $$.get(`/system/dict/data/${payload.Id}`)
}

//新增数据字典信息
export async function ApiDataDictSave(payload) {
    console.log('$$:',$$);
    return $$.post(`/system/dict/data`, payload)
}

//数据字典修改
export async function ApiDataDictUpdate(payload) {
    console.log('$$:',$$);
    return $$.put(`/system/dict/data/`, payload)
}

//数据字典删除
export async function ApiDataDictDel(payload) {
    console.log('$$:',$$);
    return $$.del(`/system/dict/data/${payload.dictCode}`)
}







