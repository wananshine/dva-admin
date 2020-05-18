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
    {
        title: '顺番',
        dataIndex: 'key',
        render: (tags) => (
            <span style={{textAlign: 'center'}}>{tags}</span>
        ),
    },
    {
        title: '品名',
        dataIndex: 'partName',
    },
    {
        title: 'Line',
        dataIndex: 'line',
    },
    {
        title: 'LotNo',
        dataIndex: 'lotNo',
    },
    {
        title: '日期',
        dataIndex: 'createTime',
    },
    {
        title: '时间',
        dataIndex: 'relateDate',
    },
    {
        title: '导入时间',
        dataIndex: 'updateTime',
    }
];
