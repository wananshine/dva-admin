import React from 'react';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { router } from 'dva';
const { Link } = router;

// {
// createBy: ""
// createTime: "2020-05-13 13:50:02"
// dashId: 6784
// dataScope: null
// line: "2"
// lotNo: "ロットNObatch"
// params: {}
// partName: "品名"
// relateDate: null
// remark: null
// searchValue: null
// status: "0"
// updateBy: ""
// updateTime: null
// }

export default (self, employees) => [
    // {
    //     title: '顺番',
    //     dataIndex: 'key',
    //     render: (tags) => (
    //         <span style={{textAlign: 'center'}}>{tags}</span>
    //     ),
    // },
    {
        title: '位置名称',
        key: 'locationName',
        dataIndex: 'locationName',
    },
    {
        title: '位置ID',
        key: 'locationId',
        dataIndex: 'locationId',
    },
    {
        title: 'X轴',
        key: 'locX',
        dataIndex: 'locX',
    },
    {
        title: 'Y轴',
        key: 'locY',
        dataIndex: 'locY',
    },
    {
        title: '创建时间',
        key: 'createTime',
        dataIndex: 'createTime',
    },
    {
        title: '操作',
        key: 'action',
        dataIndex: 'action',
    }
];
