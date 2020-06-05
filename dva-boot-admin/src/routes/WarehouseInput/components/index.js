import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Select, Divider, Table, Tag, Space, Pagination, Modal, Icon   } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined  } from '@ant-design/icons';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import createColumns from './columns';
import style from './index.module.less';
import $$ from "cmn-utils/lib/index";
const { Header, Content, Footer } = Layout;


const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ warehouse, loading }) => ({
    warehouse,
    loading: loading.models.warehouse
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
    visible: false,
    confirmLoading: false,
    formData: {}
  };

    getStartDate(){
        return new Date().toLocaleDateString().replace(/\//g,".");
    }

    getEndData(){
        return new Date().toLocaleDateString().replace(/\//g,".");
    }

    //重置
    onReset(){
      this.formRef.current.resetFields();
      console.log(1)
  }

    //删除一条数据
    onDeleteRecords(record, _this){
      const { warehouse, dispatch } = _this.props;
      Modal.confirm({
          title: '注意',
          icon: <ExclamationCircleOutlined />,
          content: '是否确认删除此笔数据？',
          onOk: () => {
              dispatch({
                  type: 'warehouse/remove',
                  payload: record
              });
              console.log(record);
          },
          onCancel() {}
      });
  }

    //新增/编辑Modal Show
    onEdit = record =>{
      console.log('record:', record);
        this.setState({
            ...this.state,
            visible: true,
            formData: (record && {
                "warehouseInputId":record.warehouseInputId,
                "partName": record.partName,
                "line": Number(record.line),
                "lotNo": record.lotNo,
                "locStart": record.locStart
            }) || {}
        });
    };

    //新增/编辑 确认
    handleOk(formData){
        const { warehouseInputId } = formData;
        const { warehouse, dispatch } = this.props;
        if(warehouseInputId){
            dispatch({
                type: 'warehouse/update',
                payload: formData
            });
        }else{
            dispatch({
                type: 'warehouse/save',
                payload: formData
            });
        }
        this.setState({
            ...this.state,
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                visible: false,
                confirmLoading: false,
                formData: {}
            });
        }, 1000)
    }

    handleCancel(){
        this.setState({
            ...this.state,
            visible: false,
            formData: {}
        });
    }

    //select Line联动
    handleLineChange (val, key, option){
      console.log('handleLineChange:',val, key, option)
      const { dispatch } = this.props;
      this.setState({
          ...this.state,
          formData: {
              ...this.state.formData,
              [key]: val,
              locStart: ''
          }
      });
      dispatch({
          type: 'warehouse/getLines',
          payload: { lineId: option.dataCode }
      });
    }

    // select 选择
    handleChange(val, key){

      this.setState({
          ...this.state,
          formData: {
              ...this.state.formData,
              [key]: val
          }
      })
    }

    //  input输入
    handleInput(val, key){
        let value = val.target.value;
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [key]: value
            }
        });
        console.log(value, this.state)
    }

    //  分页
    onChange(pageNumber, pageSize) {
        const { warehouse, dispatch } = this.props;
        dispatch({
          type: 'warehouse/getPageInfo',
          payload: {
              ...warehouse,
              pageNum: pageNumber,
              pageSize: pageSize
          }
        });
        console.log('Page: ', pageNumber, pageSize);
    }

    //查询
    onFinish = values => {
      const { warehouse, dispatch } = this.props;
      const startDate = [undefined].includes(values.datepicker) ? this.getStartDate() : ([null].includes(values.datepicker) ? '' : values.datepicker[0]._d.toLocaleDateString().replace(/\//g,"."));
      const endDate = [undefined].includes(values.datepicker) ? this.getEndData() : ([null].includes(values.datepicker) ? '' : values.datepicker[1]._d.toLocaleDateString().replace(/\//g,"."));

      const object = {
          ...warehouse,
          startDate: startDate || '',
          endDate: endDate || '',
          partName: values.partName || '',
          line: values.lineId || '',
          locStart: values.locStart || '',
      };

      dispatch({
          type: 'warehouse/getPageInfo',
          payload: {
              ...warehouse,
              ...object,
          }
      });

    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {

        const { formData, visible, confirmLoading } = this.state;
        const { warehouse , loading, dispatch } = this.props;
        const { pageData, pageNum, pageSize, pNameData, lineData, locOptions, employees } = warehouse;
        const { total, rows } = pageData;
        const lineOptions = (lineData && lineData.lineOptions) || [];
        const pNameOptions = (pNameData && pNameData.pNameOptions) || [];



        const dateFormat = 'YYYY/MM/DD';

        const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 18 },
        };

        //表头
        const columns = createColumns(this, employees);

        //表数据
        const dataSource = rows && rows.map((v, i)=>{
          v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
          return v;
        });

        const lotNos = [
          { txt: 'A00A', val: 'A00A' },
          { txt: 'A00A', val: 'A00A' },
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
                                          defaultValue={[moment(new Date().toLocaleDateString()), moment(new Date().toLocaleDateString()), dateFormat]}
                                          className={style.antPickerRange} />
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
                                                  return <Option key={i.toString() + `${v.dictCode}`} value={v.dictValue}>产线：{v.dictLabel}</Option>
                                              })
                                          }
                                      </Select>
                                  </Form.Item>
                              </Col>
                          </Row>

                          <Row gutter={16}>
                              <Button type="primary" className={style.btnAction} htmlType="submit">查询</Button>
                              <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                              <Button type="default" className={style.btnAction} onClick={()=>{this.onEdit()}}>新增</Button>
                          </Row>

                      </Form>
                  </Header>

                  <Divider />

                  <Content className={style.className}>

                      <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />

                      <Modal
                          title={formData.warehouseInputId ? '修改' : '新增'}
                          destroyOnClose
                          okText="保存"
                          visible={visible}
                          confirmLoading={confirmLoading}
                          onOk={()=>{this.handleOk(formData)}}
                          onCancel={()=>{this.handleCancel()}}
                      >
                          <div>
                              <Form ref='ModalForm'>

                                  <Form.Item label="品名："  {...formItemLayout}>
                                      <Select defaultValue={formData.partName}  onChange={(val)=>{this.handleChange(val, 'partName')}} placeholder="请选择品名" >
                                          {
                                              pNameOptions && pNameOptions.map((v, i)=>{
                                                  return <Option key={i.toString() + `${v.dictCode}`} value={v.dictValue}>{v.dictLabel}</Option>
                                              })
                                          }
                                      </Select>
                                  </Form.Item>

                                  <Form.Item label="Line：" {...formItemLayout}>
                                      <Select defaultValue={formData.line}  onChange={(val, option)=>{this.handleLineChange(val, 'line', option)}} placeholder="请选择Line">
                                          {
                                              lineOptions && lineOptions.map((v, i)=>{
                                                  return <Option key={i.toString() + `${v.dictCode}`} dataCode={v.dictCode} value={v.dictValue}>产线：{v.dictLabel}</Option>
                                              })
                                          }
                                      </Select>
                                  </Form.Item>

                                  <Form.Item label="LotNo：" {...formItemLayout}>
                                      <Input defaultValue={formData.lotNo} placeholder="请输入LotNo" onChange={(val)=>{this.handleInput(val, 'lotNo')}} autoComplete="off" />
                                      {/*<Select defaultValue={formData.lotNo} placeholder="请输入LotNo" onChange={(val)=>{this.handleChange(val, 'lotNo')}}>*/}
                                          {/*{*/}
                                              {/*lotNos.map((v, i)=>{*/}
                                                  {/*return <Option key={v.val} value={v.val}>{v.txt}</Option>*/}
                                              {/*})*/}
                                          {/*}*/}
                                      {/*</Select>*/}
                                  </Form.Item>

                                  <Form.Item label="起始位置：" {...formItemLayout}>
                                      <Select value={formData.locStart} placeholder="请选择起始位置" onChange={(val)=>{this.handleChange(val, 'locStart')}}>
                                          {
                                              locOptions && locOptions.map((v, i)=>{
                                                  return <Option key={v.locationId} value={v.locationId}>{v.locationName}</Option>
                                              })
                                          }
                                      </Select>
                                  </Form.Item>

                              </Form>
                          </div>
                      </Modal>

                  </Content>

                  <br/>

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

