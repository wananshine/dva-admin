import React from 'react';
import { Button } from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';


export default (self, employees) => {
    console.log('self', self);
    const { onEdit, onShowModal } = self;
    const { dispatch } = self.props;

    return [
        {
            title: '顺番',
            dataIndex: 'key',
            align: 'center',
            render: (tags) => (
                <span style={{textAlign: 'center'}}>{tags}</span>
            ),
        },
        {
            title: '位置名称',
            dataIndex: 'locationName',
        },
        {
            title: 'X轴',
            dataIndex: 'locX',
        },
        {
            title: 'Y轴',
            dataIndex: 'locY',
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
        },
        {
            title: '操作',
            render: (text) => (
                <div>
                    <Button type="link" onClick={()=>{ onEdit(text) }}><FormOutlined style={{fontSize: '18px'}} /></Button>
                    <Button type="link" onClick={()=>{ onShowModal(text) }}><DeleteOutlined style={{fontSize: '18px'}} /></Button>
                </div>
            ),
        }
    ]
};
