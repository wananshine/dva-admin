import React from 'react';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { router } from 'dva';
const { Link } = router;


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
        dataIndex: 'relateDate',
        render: (tags) => {
            const rData = new Date(tags).toLocaleDateString().replace(/\//g,".");
            return <span>{rData}</span>
        }
    },
    {
        title: '时间',
        dataIndex: 'time',
    },
    {
        title: '导入时间',
        dataIndex: 'createTime',
    }
];
