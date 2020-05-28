import $$ from 'cmn-utils';

//任务列表
export async function ApiTaskList(payload) {
    console.log('payload:',payload)
    return $$.get(`/warehouse/task/list?startDate=${payload.startDate}&endDate=${payload.endDate}&taskCode=${payload.taskCode}&taskType=${payload.taskType}&taskLevel=${payload.taskLevel}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}

//新增任务列表
export async function ApitaskSave(payload) {
    console.log('payload:',payload)
    return $$.post('/warehouse/task', payload)
}

//任务修改
export async function ApitaskUpdate(payload) {
    console.log('payload:',payload)
    return $$.put('/warehouse/task', payload)
}

//任务删除
export async function ApiTaskDel(payload) {
    console.log('payload:',payload)
    return $$.del(`/warehouse/task/${payload.taskId}`)
}

//任务类型Option && 优先级Option
export async function ApiTaskOption(payload) {
    return $$.get(`/system/dict/data/list?dictType=${payload.dictType}&pageNum=${payload.pageNum}&pageSize=${payload.pageSize}`)
}