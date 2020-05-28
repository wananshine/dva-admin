import React from 'react';
import { FormOutlined, EditOutlined, DeleteOutlined, LinkOutlined } from '@ant-design/icons';
import { router } from 'dva';
const { Link } = router;

// {
//     createBy: "admin"
//     createTime: "2018-03-16 11:33:00"
//     cssClass: ""
//     dataScope: null
//     default: true
//     dictCode: 1
//     dictLabel: "男"
//     dictSort: 1
//     dictType: "sys_user_sex"
//     dictValue: "0"
//     isDefault: "Y"
//     listClass: ""
//     params: {}
//     remark: "性别男"
//     searchValue: null
//     status: "0"
//     updateBy: null
//     updateTime: null
// }

export default (self, employees) => {

    console.log('self', self)
    const { onEditModal, onShowModal } = self;
    const { dispatch } = self.props;

  return [
      {
          title: '序号',
          dataIndex: 'key',
          align: 'center',
          render: (tags) => (
              <span style={{textAlign: 'center'}}>{tags}</span>
          ),
      },
      {
          title: '数据类型',
          dataIndex: 'dictType',
      },
      {
          title: '数据代码',
          dataIndex: 'dictCode',
      },
      {
          title: '数据名称',
          dataIndex: 'dictLabel',
      },
      {
          title: '排序',
          dataIndex: 'dictSort',
      },
      {
          title: '修改时间',
          dataIndex: 'updateTime',
      },
      {
          title: '操作',
          key: 'operation',
          align: 'left',
          width: '180px',
          render: (text, record) => (
              <div>
                  <div>
                      <EditOutlined onClick={()=>{ onEditModal(text, record) }} style={{fontSize: '18px', color: '#1890ff', marginRight: '24px'}} />

                      <DeleteOutlined onClick={()=>{ onShowModal(record) }} style={{fontSize: '18px', color: '#1890ff', marginRight: '24px'}} />

                      <Link to={`/data_dictionary/detail?id=${record.dictCode}`}>
                          <LinkOutlined style={{fontSize: '18px', color: '#1890ff'}} />
                      </Link>

                  </div>
                  {/*<Button tooltip="修改" onClick={e => self.onUpdate(record)}>*/}
                  {/*<Icon type="edit" />*/}
                  {/*</Button>*/}
                  {/*<Button tooltip="删除" onClick={e => self.onDelete(record)}>*/}
                  {/*<Icon type="trash" />*/}
                  {/*</Button>*/}
                  {/*<Button tooltip="跳转到新路由">*/}
                      {/*<Link to={"/crud/detail?id=" + record.id}>*/}
                        {/*<Icon type="LinkOutlined" antd />*/}
                      {/*</Link>*/}
                  {/*</Button>*/}
              </div>
          )
      }
  ]
};
