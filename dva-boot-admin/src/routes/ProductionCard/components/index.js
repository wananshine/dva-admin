import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Select, Table, Tag, Space, Pagination   } from 'antd';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
import createColumns from './columns';
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ DataProduct, loading }) => ({
    DataProduct,
    loading: loading.models.DataProduct
}))

export default class extends BaseComponent {

    formRef = React.createRef();


    getStartDate(){
        return new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString().replace(/\//g,".");
    }
    getEndData(){
        return new Date().toLocaleDateString().replace(/\//g,".");
    }

  onSearch(){
      console.log('搜索')
  }
  onReset(){
    this.formRef.current.resetFields();
    console.log(1)
  }
  onChange(pageNumber, pageSize) {
      const { DataProduct, dispatch } = this.props;
      dispatch({
          type: 'DataProduct/getPageInfo',
          payload: {
              ...DataProduct,
              pageNum: pageNumber,
              pageSize: pageSize
          }
      });
  }

    //查询
    onFinish = values => {
        const { DataProduct, dispatch } = this.props;
        if(![undefined].includes(values.datepicker)){
            console.log('have',values);
            const obj = {
                startDate: [null].includes(values.datepicker) ? '' : values.datepicker[0]._d.toLocaleDateString().replace(/\//g,"."),
                endDate: [null].includes(values.datepicker) ? '' : values.datepicker[1]._d.toLocaleDateString().replace(/\//g,"."),
                time: values.time || '',
                partName: values.partName || '',
                line: values.line || '',
                lotNo: values.lotNo || ''
            };
            dispatch({
                type: 'DataProduct/getPageInfo',
                payload: {
                    ...DataProduct,
                    ...obj,
                }
            });
            return;
        }

        const obj = {
            startDate: this.getStartDate() || '',
            endDate: this.getEndData() || '',
            time: values.time || '',
            partName: values.partName || '',
            line: values.line || '',
            lotNo: values.lotNo || ''
        };
        dispatch({
            type: 'DataProduct/getPageInfo',
            payload: {
                ...DataProduct,
                ...obj,
            }
        });
        console.log('nohave',this.getStartDate(), this.getEndData())

    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

  render() {
      const { DataProduct, loading, dispatch } = this.props;
      const { pageData, pageNum, pageSize, employees } = DataProduct;
      const { total, rows } = pageData;

      //时间格式
      const dateFormat = 'YYYY/MM/DD';

      //表数据
      const dataSource = rows && rows.map((v, i)=>{
          v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - 10;
          return v;
      });

      //表头
      const columns = createColumns(this, employees);

      const timeOptions = [
          "01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00",
          "11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00",
          "21:00","22:00","23:00","00:00"
      ];

      const partNames = [
          { txt: 'XSW', val: 'XSW' },
          { txt: 'XAW', val: 'XAW' },
      ];

      const Lines = [
          { txt: '30', val: '30' },
          { txt: '50', val: '50' },
      ];

      const lotNos = [
          { txt: 'XSW', val: 'XSW' },
          { txt: 'XAW', val: 'XAW' },
      ];

    return (
      <Layout className="">
          <Card title="">
              <Header>
                  <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={()=>{this.onFinishFailed()}}>
                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="日期：" name="datepicker">
                                  <RangePicker
                                      defaultValue={[moment(new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString()), moment(new Date().toLocaleDateString()), dateFormat]}
                                      className={style.antPickerRange} />
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="时间：" name="datetime">
                                  {/*defaultValue=""*/}
                                  <Select placeholder="请选择时间">
                                      {
                                          timeOptions.map((v, i)=>{
                                              return <Option key={v} value={v}>{v}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="品名：" name="partName">
                                  {/*defaultValue=""*/}
                                  <Select placeholder="请输入品名">
                                      {
                                          partNames.map((v, i)=>{
                                              return <Option key={v.val} value={v.val}>{v.txt}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="Line：" name="line">
                                  {/*defaultValue=""*/}
                                  <Select placeholder="请输入Line">
                                      {
                                          Lines.map((v, i)=>{
                                              return <Option key={v.val} value={v.val}>{v.txt}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="LotNo：" name="lotNo">
                                  {/*defaultValue=""*/}
                                  <Select placeholder="请输入LotNo">
                                      {
                                          lotNos.map((v, i)=>{
                                              return <Option key={v.val} value={v.val}>{v.txt}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} onClick={()=>{this.onSearch()}} htmlType="submit">查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>
                  <div>
                      <br/>
                      <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />
                  </div>
              </Content>

              <Footer>
                  <Pagination
                      hideOnSinglePage
                      showQuickJumper
                      showSizeChanger
                      current={pageNum}
                      defaultCurrent={pageNum}
                      total={total}
                      onShowSizeChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}
                      onChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}
                  />
              </Footer>

          </Card>
      </Layout>
    );
  }
}
