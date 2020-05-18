import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Table, Tag, Space, Pagination   } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import moment from 'moment';
import Panel from 'components/Panel';
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import style from './index.module.less';
const { Header, Content, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const { RangePicker } = DatePicker;
const { Column, ColumnGroup } = Table;

@connect()

export default class extends BaseComponent {

  onSearch(){
      console.log('搜索')
  }
  onReset(){
      console.log(1)
  }
    onCreateTask(){
      console.log('生成任务')
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
              title: '品名',
              dataIndex: 'address',
          },
          {
              title: 'LotNo',
              dataIndex: 'address',
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
              title: '匹配',
              dataIndex: 'address',
              render: () => (
                  <div>
                      <CheckSquareOutlined style={{fontSize: '20px', color: 'green'}} />
                      {/*<CloseSquareOutlined />*/}
                  </div>
              )
          }
      ];
      // const data = [
      //     {
      //         key: '1',
      //         name: 'John Brown',
      //         age: 32,
      //         address: 'New York No. 1 Lake Park',
      //     },
      //     {
      //         key: '2',
      //         name: 'Jim Green',
      //         age: 42,
      //         address: 'London No. 1 Lake Park',
      //     },
      //     {
      //         key: '3',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '4',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '5',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     },
      //     {
      //         key: '6',
      //         name: 'Joe Black',
      //         age: 32,
      //         address: 'Sidney No. 1 Lake Park',
      //     }
      // ];

      const paginationConfig = {
          // 分页
          position: 'center'
      }

      const data = [
          {
              key: '1',
              indexNo: 'John',
              lastName: 'Brown',
              age: 32,
              address: 'New York No. 1 Lake Park',
              tags: ['nice', 'developer'],
          },
          {
              key: '2',
              indexNo: 'Jim',
              lastName: 'Green',
              age: 42,
              address: 'London No. 1 Lake Park',
              tags: ['loser'],
          },
          {
              key: '3',
              indexNo: 'Joe',
              lastName: 'Black',
              age: 32,
              address: 'Sidney No. 1 Lake Park',
              tags: ['cool', 'teacher'],
          },
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
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onCreateTask()}}>生成任务</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>
                  <div>
                      <h4></h4>
                      <Table dataSource={data}
                             bordered size="middle"
                             pagination={false}>

                          <Column title="顺番" dataIndex="indexNo" key="indexNo" />

                          <ColumnGroup title="仓库输入">
                              <Column title="品名" dataIndex="indexNo" key="indexNo" />
                              <Column title="Line" dataIndex="lastName" key="lastName" />
                              <Column title="LotNo" dataIndex="lastName" key="lastName" />
                          </ColumnGroup>

                          <ColumnGroup title="数据源">
                              <Column title="品名" dataIndex="age" key="age" />
                              <Column title="Line" dataIndex="address" key="address" />
                              <Column title="LotNo" dataIndex="address" key="address" />
                          </ColumnGroup>

                          <Column title="匹配" dataIndex="indexNo" key="indexNo" render={(text, record) => (
                              <div size="middle">
                                  <CheckSquareOutlined style={{fontSize: '24px', color: 'green'}} />
                                  <CloseSquareOutlined style={{fontSize: '24px', color: 'red'}} />
                              </div>
                          )}/>
                      </Table>
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
