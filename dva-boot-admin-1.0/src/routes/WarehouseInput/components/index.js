import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Table, Tag, Space, Pagination, Modal, Icon   } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import moment from 'moment';
import Panel from 'components/Panel';
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import style from './index.module.less';
// import {Modal} from "antd/lib/index";
import $$ from "cmn-utils/lib/index";
const { Header, Content, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const { RangePicker } = DatePicker;

@connect(({ crud, loading }) => ({
    crud,
    loading: loading.models.crud
}))

export default class extends BaseComponent {

  state = {
    visible: false,
    confirmLoading: false,
  };

  onSearch(){
      console.log('搜索')
  }
  onReset(){
      console.log(1)
  }
  onAdd(){
      console.log('新增')
  }

  onDeleteRecords(record){
      Modal.confirm({
          title: '注意',
          icon: <ExclamationCircleOutlined />,
          content: '是否确认删除此笔数据？',
          onOk: () => {
              console.log(record);
          },
          onCancel() {}
      });
  }

    onToggleModal(){
      console.log(123)
        this.setState({
            visible: true,
        });
    }

    handleOk(){
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        }, 2000);
    }

    handleCancel(){
        this.setState({
            visible: false,
        });
    }


  onChange(pageNumber, pageSize) {
      console.log('Page: ', pageNumber, pageSize);
  }

  render() {

      const { visible, confirmLoading } = this.state;

      const dateFormat = 'YYYY/MM/DD';

      const columns = [
          {
              title: '顺番',
              dataIndex: 'name',
              align: 'center',
              render: (tags) => (
                  <span style={{textAlign: 'center'}}>{tags}</span>
              ),
          },
          {
              title: '品名',
              dataIndex: 'age',
          },
          {
              title: 'Line',
              dataIndex: 'address',
          },
          {
              title: 'LotNo',
              dataIndex: 'address',
          },
          {
              title: '输入日期',
              dataIndex: 'address',
              align: 'right',
          },
          {
              title: '',
              key: 'operation',
              render: (text, record) => (
                  <div>
                      <Button type="link" tooltip="修改" onClick={()=>{ this.onToggleModal() }} style={{fontSize: '18px'}}>
                          <EditOutlined />
                      </Button>
                      <Button type="link" tooltip="删除" onClick={()=>{ this.onDeleteRecords(record) }} style={{fontSize: '18px'}}>
                          <DeleteOutlined />
                      </Button>
                      {/*<Link className="topo-data" to={{pathname:'/a',query:{id:text.id}}}>数据拓扑</Link>*/}
                  </div>
              ),
          }
      ];

      const data = [
          {
              key: '1',
              name: 'John Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
          },
          {
              key: '2',
              name: 'Jim Green',
              age: 42,
              address: 'London No. 1 Lake Park',
          },
          {
              key: '3',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '4',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '5',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          },
          {
              key: '6',
              name: 'Joe Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
          }
      ];

    return (
      <Layout className="">
          <Card title="">
              <Header>
                  <Form>
                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="日期：" name="size">
                                  {/*moment().add(10, 'days').calendar();*/}
                                  <RangePicker
                                      defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                                      className={style.antPickerRange} />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="品名：" >
                                  <Input placeholder="请输入品名" />
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="Line：" >
                                  <Input placeholder="请输入Line" />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} onClick={()=>{this.onSearch()}}>查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onAdd()}}>新增</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>
                  <div>
                      <h4></h4>
                      <Table pagination={false} columns={columns} dataSource={data} bordered size="middle" />
                  </div>

                  <Modal
                      title="新增/修改页面"
                      okText="保存"
                      visible={visible}
                      confirmLoading={confirmLoading}
                      onOk={()=>{this.handleOk()}}
                      onCancel={()=>{this.handleCancel()}}
                  >
                      <div>
                          <Form>

                              <Row gutter={16}>
                                  <Col span={12}>
                                      <Form.Item label="品名：" >
                                          <Input placeholder="请输入品名" />
                                      </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                      <Form.Item label="Line：" >
                                          <Input placeholder="请输入Line" />
                                      </Form.Item>
                                  </Col>
                              </Row>

                              <Row gutter={16}>
                                  <Col span={12}>
                                      <Form.Item label="LotNo：" >
                                          <Input placeholder="请输入LotNo" />
                                      </Form.Item>
                                  </Col>
                              </Row>

                          </Form>
                      </div>
                  </Modal>

              </Content>

              <Footer>
                  <Pagination
                      hideOnSinglePage
                      showQuickJumper
                      showSizeChanger
                      defaultCurrent={1}
                      total={1000}
                      onShowSizeChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}
                      onChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}
                  />
              </Footer>

          </Card>
      </Layout>
    );
  }
}
