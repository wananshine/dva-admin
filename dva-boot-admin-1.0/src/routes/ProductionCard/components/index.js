import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Table, Tag, Space, Pagination   } from 'antd';
import moment from 'moment';
import Panel from 'components/Panel';
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import style from './index.module.less';
const { Header, Content, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const { RangePicker } = DatePicker;

@connect()

export default class extends BaseComponent {

  onSearch(){
      console.log('搜索')
  }
  onReset(){
      console.log(1)
  }
  onChange(pageNumber, pageSize) {
      console.log('Page: ', pageNumber, pageSize);
  }

  render() {

      const dateFormat = 'YYYY/MM/DD';

      const columns = [
          {
              title: '顺番',
              dataIndex: 'name',
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
              title: '日期',
              dataIndex: 'address',
          },
          {
              title: '时间',
              dataIndex: 'address',
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
                                  <RangePicker
                                      defaultValue={[moment(new Date(), dateFormat), moment(new Date(), dateFormat)]}
                                      className={style.antPickerRange} />
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="时间：">
                                  <Input placeholder="请输入时间" />
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
                          <Col span={6}>
                              <Form.Item label="LotNo：" >
                                  <Input placeholder="请输入LotNo" />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} onClick={()=>{this.onSearch()}}>查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>
                  <div>
                      <h4></h4>
                      <Table pagination={false} columns={columns} dataSource={data} bordered size="middle" />
                  </div>
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
