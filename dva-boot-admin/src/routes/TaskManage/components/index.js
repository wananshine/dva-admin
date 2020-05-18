import React, { useState } from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Select, Button, Table, Tag, Space, Pagination, Modal, Icon   } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import Panel from 'components/Panel';
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import style from './index.module.less';
const { Header, Content, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect()




export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
        visible: false,
        confirmLoading: false,
    };



  onSearch(){
      console.log('搜索')
  }
  onReset(){
      this.formRef.current.resetFields();
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

    handleChange(){

    }
  onChange(pageNumber, pageSize) {
      console.log('Page: ', pageNumber, pageSize);
  }


    onFinish = values => {
        console.log(values);
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

  render() {
      // const [form] = Form.useForm();

      const { visible, confirmLoading } = this.state;
      const { loading } = this.props;

      const dateFormat = 'YYYY/MM/DD';

      const formItemLayout = {
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
      };

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
              title: '任务编号',
              dataIndex: 'age',
          },
          {
              title: '任务类型',
              dataIndex: 'address',
          },
          {
              title: '优先级',
              dataIndex: 'address',
              align: 'right',
          },
          {
              title: '任务创建时间',
              dataIndex: 'address',
              align: 'right',
          },
          {
              title: '执行状态',
              dataIndex: 'address',
              render: (tags) => (
                  <Tag color="green">{tags}</Tag>
              ),
          },
          {
              title: '',
              key: 'operation',
              render: (text, record) => (
                  <div>
                      <Button type="link" tooltip="修改" onClick={()=>{ this.onAdd() }} style={{fontSize: '18px'}}>
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
                  <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={()=>{this.onFinishFailed()}}>
                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="日期：" name="range-picker">
                                  <RangePicker
                                      defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                                      className={style.antPickerRange} />
                              </Form.Item>
                          </Col>

                      </Row>

                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="任务编号：" name="taskNo">
                                  <Input placeholder="请输入任务编号" />
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="任务类型：" name="taskType">
                                  <Select defaultValue="" onChange={()=>{this.handleChange()}} placeholder="请选择任务类型">
                                      <Option value="jack">Jack</Option>
                                      <Option value="lucy">Lucy</Option>
                                      <Option value="Yiminghe">yiminghe</Option>
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="优先级：" name="taskLevel">
                                  <Input placeholder="请输入优先级" />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} onClick={()=>{this.onSearch()}} htmlType="submit">查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onAdd()}}>新增</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>

                  <div>
                      <h4></h4>
                      <Table loading={loading} pagination={false} columns={columns} dataSource={data} bordered size="middle" />
                  </div>

                  {/*新增/修改页面弹框*/}
                  <Modal
                      width="680px"
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
                                  <Col span={8}>
                                      <Form.Item label="任务编号："  {...formItemLayout}>
                                          <Input placeholder="请输入任务编号" />
                                      </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                      <Form.Item label="任务类型：" {...formItemLayout}>
                                          <Select defaultValue="lucy" onChange={()=>{this.handleChange()}}>
                                              <Option value="jack">Jack</Option>
                                              <Option value="lucy">Lucy</Option>
                                              <Option value="Yiminghe">yiminghe</Option>
                                          </Select>
                                      </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                      <Form.Item label="优先级：" {...formItemLayout}>
                                          <Input placeholder="请输入优先级" />
                                      </Form.Item>
                                  </Col>
                              </Row>

                              <Row gutter={16}>
                                  <Col span={8}>
                                      <Form.Item label="位置1：" {...formItemLayout}>
                                          <Input placeholder="" />
                                      </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                      <Form.Item label="位置2：" {...formItemLayout}>
                                          <Input placeholder="" />
                                      </Form.Item>
                                  </Col>
                                  <Col span={8}>
                                      <Form.Item label="位置3：" {...formItemLayout}>
                                          <Input placeholder="" />
                                      </Form.Item>
                                  </Col>
                              </Row>

                              <Row gutter={16}>
                                  <Col span={8}>
                                      <Form.Item label="位置4：" {...formItemLayout}>
                                          <Input placeholder="" />
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

const Demo = ()=>{
    const onFinish = values => {
        console.log('Success:', values);
    };

    const onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Form
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>

            <Form.Item >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
}
