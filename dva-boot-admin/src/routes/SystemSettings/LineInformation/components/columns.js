import React from 'react';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { router } from 'dva';
const { Link } = router;

// {
//     createBy: "admin123"
//     createTime: "2020-05-14 17:34:32"
//     cssClass: null
//     dataScope: null
//     default: false
//     dictCode: 100
//     dictLabel: "30"
//     dictSort: 0
//     dictType: "warehouse_line"
//     dictValue: "30"
//     isDefault: "N"
//     key: 1
//     listClass: null
//     params: {}
//     remark: "产线-30"
//     searchValue: null
//     status: "0"
//     updateBy: null
//     updateTime: null
// }

export default (self, employees) => [
    {
        title: '顺番',
        dataIndex: 'key',
        align: 'center',
        render: (tags) => (
            <span style={{textAlign: 'center'}}>{tags}</span>
        ),
    },
    {
        title: '产线名称',
        key: 'dictLabel',
        dataIndex: 'dictLabel',
    },
    {
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
    },
    // {
    //     title: '操作',
    //     key: 'action',
    //     dataIndex: 'action',
    // }
];
