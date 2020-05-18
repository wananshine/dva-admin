import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Select, Table, Tag, Space, Pagination   } from 'antd';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import ExportJsonExcel from 'js-export-excel';
import style from './index.module.less';
import createColumns from './columns';


const { Header, Content, Footer } = Layout;
const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ DataSourceManage, loading }) => ({
    DataSourceManage,
    loading: loading.models.DataSourceManage
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

  //导出
  onExport(data){
      //导出为excel文件的方法
      const propsData = {
          getRepaymentPlanList: data
      }
      const { getRepaymentPlanList } = propsData;  //从props中获取数据源
      let option = {};  //option代表的就是excel文件
      let dataTable = [];  //excel文件中的数据内容
      if (getRepaymentPlanList && getRepaymentPlanList.length > 0) {
          for (let i in getRepaymentPlanList) {  //循环获取excel中每一行的数据
              let obj = {
                  '顺番': getRepaymentPlanList[i].key,
                  '品名': getRepaymentPlanList[i].partName,
                  'Line': getRepaymentPlanList[i].line,
                  'LotNo': getRepaymentPlanList[i].lotNo,
                  '日期': getRepaymentPlanList[i].createTime,
                  '时间': getRepaymentPlanList[i].relateDate,
                  '导入时间': getRepaymentPlanList[i].updateTime
              }
              dataTable.push(obj);  //设置excel中每列所获取的数据源
          }
      }
      option.fileName = '数据源管理';  //excel文件名称
      option.datas = [
          {
              sheetData: dataTable,  //excel文件中的数据源
              sheetName: '数据源管理',  //excel文件中sheet页名称
              sheetFilter: ['顺番', '品名', 'Line', 'LotNo', '日期', '导入时间'],  //excel文件中需显示的列数据
              sheetHeader: ['顺番', '品名', 'Line', 'LotNo', '日期', '导入时间'],  //excel文件中每列的表头名称
          }
      ]
      let toExcel = new ExportJsonExcel(option);  //生成excel文件
      toExcel.saveExcel();  //下载excel文件
  }

  //分页
  onChange(pageNumber, pageSize) {
      const { DataSourceManage, dispatch } = this.props;
      dispatch({
          type: 'DataSourceManage/getPageInfo',
          payload: {
              ...DataSourceManage,
              pageNum: pageNumber,
              pageSize: pageSize
          }
      });
  }

  //查询
  onFinish = values => {
      const { DataSourceManage, dispatch } = this.props;
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
              type: 'DataSourceManage/getPageInfo',
              payload: {
                  ...DataSourceManage,
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
          type: 'DataSourceManage/getPageInfo',
          payload: {
              ...DataSourceManage,
              ...obj,
          }
      });
      console.log('nohave',this.getStartDate(), this.getEndData())

  };

  onFinishFailed(errorInfo) {
    console.log('Failed:', errorInfo);
  }


  render() {

      const { DataSourceManage, loading, dispatch } = this.props;
      const { pageData, pageNum, pageSize, employees } = DataSourceManage;
      const { total, rows } = pageData;

      //时间格式
      const dateFormat = 'YYYY.MM.DD';

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
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onExport(dataSource)}}>导出</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>
                  <div>
                      <br />
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
