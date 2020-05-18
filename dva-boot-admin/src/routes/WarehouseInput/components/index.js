import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Select, Table, Tag, Space, Pagination, Modal, Icon   } from 'antd';
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

    getStartDate(){
        return new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString().replace(/\//g,".");
    }
    getEndData(){
        return new Date().toLocaleDateString().replace(/\//g,".");
    }

  state = {
    visible: false,
    confirmLoading: false,
    formData: {}
  };

  onSearch(){
      console.log('搜索')
  }
    onReset(){
        this.formRef.current.resetFields();
        console.log(1)
    }

  //新增/编辑Modal Show
    onEdit = record =>{
        this.setState({
            ...this.state,
            visible: true,
            formData: record || {}
        });
    };

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

    handleOk(formData){
        const { warehouse, dispatch } = this.props;
        dispatch({
            type: 'warehouse/save',
            payload: this.state.formData
        });
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                ...this.state,
                visible: false,
                confirmLoading: false,
                formData: {}
            });
        }, 2000)
    }

    handleCancel(){
        this.setState({
            ...this.state,
            visible: false,
            formData: {}
        });
    }

    handleChange(val, key){
        console.log(val, key)
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [key]: val,
            }
        });
        console.log(val, this.state)
    }

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
        if(![undefined].includes(values.datepicker)){
            console.log('have',values);
            const obj = {
                startDate: [null].includes(values.datepicker) ? '' : values.datepicker[0]._d.toLocaleDateString().replace(/\//g,"."),
                endDate: [null].includes(values.datepicker) ? '' : values.datepicker[1]._d.toLocaleDateString().replace(/\//g,"."),
                partName: values.partName || '',
                line: values.line || '',
            };
            dispatch({
                type: 'warehouse/getPageInfo',
                payload: {
                    ...warehouse,
                    ...obj,
                }
            });
            return;
        }

        const obj = {
            startDate: this.getStartDate() || '',
            endDate: this.getEndData() || '',
            partName: values.partName || '',
            line: values.line || '',
        };
        dispatch({
            type: 'warehouse/getPageInfo',
            payload: {
                ...warehouse,
                ...obj,
            }
        });
        console.log('nohave',this.getStartDate(), this.getEndData())
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

  render() {

      const { formData, visible, confirmLoading } = this.state;
      const { warehouse , loading, dispatch } = this.props;
      const { pageData, pageNum, pageSize, employees } = warehouse;
      const { total, rows } = pageData;



      const dateFormat = 'YYYY/MM/DD';

      //表头
      const columns = createColumns(this, employees);

      //表数据
      const dataSource = rows && rows.map((v, i)=>{
          v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - 10;
          return v;
      });

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
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction} onClick={()=>{this.onSearch()}} htmlType="submit">查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onEdit()}}>新增</Button>
                      </Row>

                  </Form>
              </Header>

              <Content className={style.className}>
                  <div>
                      <h4></h4>
                      <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />
                  </div>

                  <Modal
                      title="新增/修改页面"
                      destroyOnClose
                      okText="保存"
                      visible={visible}
                      confirmLoading={confirmLoading}
                      onOk={()=>{this.handleOk(formData)}}
                      onCancel={()=>{this.handleCancel()}}
                  >
                      <div>
                          <Form ref='ModalForm'>
                              <Row gutter={16}>
                                  <Col span={12}>
                                      <Form.Item label="品名：" >
                                          <Select defaultValue={formData.partName}  onChange={(val)=>{this.handleChange(val, 'partName')}} placeholder="请输入品名" >
                                              {
                                                  partNames.map((v, i)=>{
                                                      return <Option key={v.val} value={v.val}>{v.txt}</Option>
                                                  })
                                              }
                                          </Select>
                                      </Form.Item>
                                  </Col>
                                  <Col span={12}>
                                      <Form.Item label="Line：" >
                                          <Select defaultValue={formData.line}  onChange={(val)=>{this.handleChange(val, 'line')}} placeholder="请输入Line">
                                              {
                                                  Lines.map((v, i)=>{
                                                      return <Option key={v.val} value={v.val}>{v.txt}</Option>
                                                  })
                                              }
                                          </Select>
                                      </Form.Item>
                                  </Col>
                              </Row>

                              <Row gutter={16}>
                                  <Col span={12}>
                                      <Form.Item label="LotNo：" >
                                          <Select defaultValue={formData.lotNo} placeholder="请输入LotNo" onChange={(val)=>{this.handleChange(val, 'LotNo')}}>
                                              {
                                                  lotNos.map((v, i)=>{
                                                      return <Option key={v.val} value={v.val}>{v.txt}</Option>
                                                  })
                                              }
                                          </Select>
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

