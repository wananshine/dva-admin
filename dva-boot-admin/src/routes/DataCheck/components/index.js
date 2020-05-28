import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Select, Divider, Table, Tag, Space, Pagination   } from 'antd';
import { CheckSquareOutlined, CloseSquareOutlined } from '@ant-design/icons';
import moment from 'moment';
import Panel from 'components/Panel';
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import style from './index.module.less';
const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;


const { Column, ColumnGroup } = Table;

@connect(({ dataCheck, loading }) => ({
    dataCheck,
    loading: loading.models.dataCheck
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
    };

    //获取今日之前-5天日期
    getStartDate(){
        return new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString().replace(/\//g,".");
    }

    //获取今日日期
    getEndData(){
        return new Date().toLocaleDateString().replace(/\//g,".");
    }

    //重置
    onReset(){
        this.formRef.current.resetFields();
    }

    //取消任务
    onCancelTask(){
        const { dataCheck, dispatch } = this.props;
        console.log('取消任务')
    }

    //分页
    onChange(pageNumber, pageSize) {
        const { dataCheck, dispatch } = this.props;
        dispatch({
            type: 'dataCheck/getPageInfo',
            payload: {
                ...dataCheck,
                pageNum: pageNumber,
                pageSize: pageSize
            }
        });
    }

    //查询
    onFinish = values => {

        const { dataCheck, dispatch } = this.props;
        const startData = [undefined].includes(values.datepicker) ? this.getStartDate() : ([null].includes(values.datepicker) ? '' : values.datepicker[0]._d.toLocaleDateString().replace(/\//g,"."));
        const endData = [undefined].includes(values.datepicker) ? this.getEndData() : ([null].includes(values.datepicker) ? '' : values.datepicker[1]._d.toLocaleDateString().replace(/\//g,"."));

        const object = {
            startDate: startData || '',
            endDate: endData || '',
            time: values.time || '',
            partName: values.partName || '',
            line: values.lineId || '',
            lotNo: values.lotNo || ''
        };
        dispatch({
            type: 'dataCheck/getPageInfo',
            payload: {
                ...dataCheck,
                ...object,
            }
        })

    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
    };

  render() {

      const { dataCheck, loading, dispatch } = this.props;
      const { pageData, pageNum, pageSize, pNameData, lineData, employees } = dataCheck;
      const { total, rows } = pageData;
      const lineOptions = (lineData && lineData.lineOptions) || [];
      const pNameOptions = (pNameData && pNameData.pNameOptions) || [];


      const dateFormat = 'YYYY/MM/DD';


      //表数据
      const dataSource = rows && rows.map((v, i)=>{
          v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
          return v;
      });

      const rowSelection = {
          onChange: this.onSelectChange,
      };

      const timeOptions = [
          "01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00",
          "11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00",
          "21:00","22:00","23:00","00:00"
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
                              <Form.Item label="时间：" name="time">
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
                                  <Select placeholder="请选择Line">
                                      {
                                          lineOptions && lineOptions.map((v, i)=>{
                                              return <Option key={i.toString() + `${v.dictCode}`} value={v.dictCode}>产线：{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="LotNo：" name="lotNo">
                                  <Input placeholder="请输入LotNo" autoComplete="off" />
                                  {/*<Select defaultValue="" placeholder="请选择LotNo">*/}
                                      {/*{*/}
                                          {/*lotNos.map((v, i)=>{*/}
                                              {/*return <Option key={v.val} value={v.val}>{v.txt}</Option>*/}
                                          {/*})*/}
                                      {/*}*/}
                                  {/*</Select>*/}
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} htmlType="submit">查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onCancelTask()}}>取消任务</Button>
                      </Row>

                  </Form>
              </Header>

              <Divider />

              <Content className={style.className}>
                  <div>
                      <Table loading={loading}
                             dataSource={dataSource}
                             rowSelection={rowSelection}
                             bordered size="middle"
                             pagination={false}>

                          <Column title="顺番" dataIndex="key" key="indexNo" align="center" />

                          <ColumnGroup title="仓库输入" className={style.tableGray}>
                              <Column title="品名" dataIndex="partName" key="indexNo" />
                              <Column title="Line" dataIndex="line" key="lastName" />
                              <Column title="LotNo" dataIndex="lotNo" key="lastName" />
                              <Column title="起始位置" dataIndex="locationName" key="lastName" />
                          </ColumnGroup>

                          <ColumnGroup title="数据源" className={style.tableGold}>
                              <Column title="品名" dataIndex="partName2" key="age" />
                              <Column title="Line" dataIndex="line2" key="address" />
                              <Column title="LotNo" dataIndex="lotNo2" key="address" />
                          </ColumnGroup>

                          <Column title="匹配" dataIndex="indexNo" key="indexNo" render={(text, record) => (
                              <div size="middle">
                                  {
                                      [1, '1'].includes(record.checkResult) ?
                                          <CheckSquareOutlined style={{fontSize: '24px', color: 'green'}} /> :
                                          <CloseSquareOutlined style={{fontSize: '24px', color: 'red'}} />
                                  }
                              </div>
                          )}/>
                      </Table>
                  </div>
              </Content>

              <br />

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
