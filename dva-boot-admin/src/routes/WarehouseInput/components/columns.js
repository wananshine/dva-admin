import React from 'react';
import { FormOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { router } from 'dva';
const { Link } = router;

// {
//     checkResult: ""
//     createBy: ""
//     createTime: "2020-05-13 16:19:01"
//     dataScope: null
//     endDate: null
//     executeTime: null
//     line: "2"
//     lotNo: "2010JPY0Z"
//     params: {}
//     partName: "DAW"
//     remark: null
//     searchValue: null
//     startDate: null
//     status: "0"
//     updateBy: ""
//     updateTime: null
//     warehouseInputId: 2
// }

export default (self, employees) => {

    console.log('self', self)
    const { onEdit, onDeleteRecords } = self;
    const { dispatch } = self.props;

    return [
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
            title: '导入时间',
            dataIndex: 'updateTime',
        },
        {
            title: '操作',
            key: 'operation',
            align: 'left',
            width: '180px',
            render: (text, record) => (
                <div>
                    <EditOutlined onClick={()=>{ onEdit(text, record) }} style={{fontSize: '18px', color: '#1890ff', margin: '0px 26px'}} />

                    <DeleteOutlined onClick={()=>{ onDeleteRecords(record) }} style={{fontSize: '18px', color: '#1890ff'}} />
                </div>
            )
        }
    ]
}
