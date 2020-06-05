import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, TimePicker, Input, Button, Select, Divider, Table, Tag, Space, Pagination   } from 'antd';
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

  //分页
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
        const startDate = [undefined].includes(values.datepicker) ? this.getStartDate() : ([null].includes(values.datepicker) ? '' : moment(values.datepicker[0]).format('YYYY.MM.DD'));
        const endDate = [undefined].includes(values.datepicker) ? this.getEndData() : ([null].includes(values.datepicker) ? '' : moment(values.datepicker[1]).format('YYYY.MM.DD'));
        const time = [undefined, null].includes(values.time) ? '' : moment(values.time).format('HH:mm');

        const object = {
            pageNum: 1,
            startDate: startDate,
            endDate: endDate,
            time: time,
            partName: values.partName || '',
            line: values.lineId || '',
            lotNo: values.lotNo || ''
        };

        dispatch({
            type: 'DataProduct/getPageInfo',
            payload: {
                ...DataProduct,
                ...object,
            }
        })

    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

  render() {
      const { DataProduct, loading, dispatch } = this.props;
      const { pageData, pageNum, pageSize, pNameData, lineData, employees } = DataProduct;
      const { total, rows } = pageData;
      const lineOptions = (lineData && lineData.lineOptions) || [];
      const pNameOptions = (pNameData && pNameData.pNameOptions) || [];


      //日期格式
      const dateFormat = 'YYYY/MM/DD';

      //时间格式
      const timeFormat = 'HH:mm';

      //表数据
      const dataSource = rows && rows.map((v, i)=>{
          v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
          return v;
      }).slice(0, 5);  //

      //表头
      const columns = createColumns(this, employees);


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
                              <Form.Item label="时间：" name="time">
                                  {/*defaultValue=""*/}
                                  <TimePicker format={timeFormat} />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="品名：" name="partName">
                                  {/*defaultValue=""*/}
                                  <Select placeholder="请选择品名">
                                      {
                                          pNameOptions && pNameOptions.map((v, i)=>{
                                              return <Option key={i.toString() + `${v.dictCode}`} value={v.dictValue}>{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="Line：" name="lineId">
                                  {/*defaultValue=""*/}
                                  <Select placeholder="请输入Line">
                                      {
                                          lineOptions && lineOptions.map((v, i)=>{
                                              return <Option key={i.toString() + `${v.dictCode}`} value={v.dictValue}>产线：{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="LotNo：" name="lotNo">
                                  <Input placeholder="请输入LotNo" autoComplete="off" />
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} onClick={()=>{this.onSearch()}} htmlType="submit">查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                      </Row>

                  </Form>
              </Header>

              <Divider />

              <Content className={style.className}>
                  <div>
                      <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />
                  </div>
              </Content>

              <br/>

              <Footer>
                  <Pagination
                      style={{display: 'none'}}
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
