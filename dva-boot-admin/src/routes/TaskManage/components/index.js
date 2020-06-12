import React, { useState } from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Select, Button, Divider, Table, Tag, Space, Pagination, Modal, Icon   } from 'antd';
import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, CloseCircleOutlined, StopOutlined } from '@ant-design/icons';
import moment from 'moment';
import Panel from 'components/Panel';
import BaseComponent from 'components/BaseComponent';
import DataTable from 'components/DataTable';
import style from './index.module.less';
const { Header, Content, Footer } = Layout;
// const Pagination = DataTable.Pagination;

const { RangePicker } = DatePicker;
const { Option } = Select;

@connect(({ TaskManageData, loading }) => ({
    TaskManageData,
    loading: loading.models.TaskManageData
}))




export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
        visible: false,
        confirmLoading: false,
        formData: {}
    };

    getStartDate(){
        return new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString().replace(/\//g,".");
    }
    getEndData(){
        return new Date().toLocaleDateString().replace(/\//g,".");
    }


  onReset(){
      this.formRef.current.resetFields();
  }

    //删除数据
    onDeleteRecords(record){
        const { dispatch } = this.props;
        Modal.confirm({
            title: '注意',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认删除此笔数据？',
            onOk: () => {
                dispatch({
                    type: 'TaskManageData/remove',
                    payload: record
                });
                console.log(record);
            },
            onCancel() {}
        });
    }


    //取消任务
    onCancelRecords(record){
        console.log(record)
        const { dispatch } = this.props;
        Modal.confirm({
            title: '注意',
            icon: <ExclamationCircleOutlined />,
            content: '是否确认取消此笔数据？',
            onOk: () => {
                dispatch({
                    type: 'TaskManageData/cancel',
                    payload: {
                        taskCode: record.taskCode
                    }
                });
            },
            onCancel() {}
        });
    }


    //新增/编辑Modal Show
    onEdit = record =>{
        console.log('编辑Modal:', record);
        this.setState({
            ...this.state,
            visible: true,
            formData: (record && {
                taskId:record.taskId,
                taskType: record.taskType,
                taskLevel: record.taskLevel,
                taskCode: record.taskCode,
                // startLoc: record.startLoc,
                // endLoc: record.endLoc
                loc1: record.loc1,
                loc2: record.loc2
            }) || {}
        });
    };

    handleOk(formData){
        console.log('formData:',formData);
        const { taskId } = formData;
        const { TaskManageData, dispatch } = this.props;
        if(taskId){
            dispatch({
                type: 'TaskManageData/update',
                payload: formData
            });
        }else{
            dispatch({
                type: 'TaskManageData/save',
                payload: formData
            });
        }
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
        }, 1000)
    }

    handleCancel(){
        this.setState({
            visible: false,
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
      const { TaskManageData, dispatch } = this.props;
      // const startDate = [undefined, null, ''].includes(TaskManageData.startDate) ? this.getStartDate() : TaskManageData.startDate;
      // const endDate = [undefined, null, ''].includes(TaskManageData.endDate) ? this.getEndData() : TaskManageData.endDate;
      dispatch({
          type: 'TaskManageData/getPageInfo',
          payload: {
              ...TaskManageData,
              // startDate: startDate,
              // endDate: endDate,
              pageNum: pageNumber,
              pageSize: pageSize
          }
      });
  }


    //查询
    onFinish = values => {
        const { TaskManageData, dispatch } = this.props;
        console.log('TaskManageData:', TaskManageData)
        const startDate = [undefined].includes(values.datepicker) ? this.getStartDate() : ([null].includes(values.datepicker) ? '' : values.datepicker[0]._d.toLocaleDateString().replace(/\//g,"."));
        const endDate = [undefined].includes(values.datepicker) ? this.getEndData() : ([null].includes(values.datepicker) ? '' : values.datepicker[1]._d.toLocaleDateString().replace(/\//g,"."));
        const object = {
            pageNum: 1,
            startDate: startDate,
            endDate: endDate,
            taskType: values.taskType || '',
            taskLevel: values.taskLevel || '',
            taskCode: values.taskCode || ''
        };
        dispatch({
            type: 'TaskManageData/getPageInfo',
            payload: {
                ...TaskManageData,
                ...object,
            }
        })

    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

  render() {
      // const [form] = Form.useForm();
      const { formData, visible, confirmLoading } = this.state;
      const { TaskManageData, loading, dispatch } = this.props;
      const { pageData, pageNum, pageSize, typeOptions, levelOptions, locOptions, employees } = TaskManageData;
      const { total, rows } = pageData;

      const dateFormat = 'YYYY/MM/DD';

      const formItemLayout = {
          labelCol: { span: 4 },
          wrapperCol: { span: 18 },
      };

      //表头
      const columns = [
          {
              title: '顺番',
              dataIndex: 'key',
              align: 'center',
              render: (tags) => (
                  <span style={{textAlign: 'center'}}>{tags}</span>
              ),
          },
          {
              title: '任务编号',
              dataIndex: 'taskCode',
              // align: 'right',
          },
          {
              title: '任务类型',
              dataIndex: 'taskTypeName',
          },
          {
              title: '起始位置',
              dataIndex: 'startLoc',
          },
          {
              title: '目的位置',
              dataIndex: 'endLoc',
          },
          {
              title: '优先级',
              dataIndex: 'taskLevel',
              align: 'center',
              render: (tags) => (
                  <Tag color="blue">{tags}</Tag>
              ),
          },
          {
              title: '任务创建时间',
              dataIndex: 'createTime',
              align: 'right',
          },
          {
              title: '执行状态',
              dataIndex: 'runResult',  //0：任务开始，1：任务完成 ，2：走出储位，3：任务失败
              render: (tags) => (
                  <span>
                      { [null, ''].includes(tags) && <Tag>{tags}</Tag> }
                      { tags && [0, '0'].includes(tags) && <Tag color="#ffc107">任务开始</Tag> }
                      { tags && [1, '1'].includes(tags) && <Tag color="#ff1100">任务完成</Tag> }
                      { tags && [2, '2'].includes(tags) && <Tag color="#00bd22">走出储位</Tag> }
                      { tags && [3, '3'].includes(tags) && <Tag color="#00bd08">任务失败</Tag> }
                  </span>

              )
          },
          {
              title: '',
              key: 'operation',
              render: (text, record) => (
                  <div>
                      <Button type="link" tooltip="修改" onClick={()=>{ this.onEdit(record) }} style={{fontSize: '18px'}}>
                          <EditOutlined />
                      </Button>
                      <Button type="link" tooltip="删除" onClick={()=>{ this.onDeleteRecords(record) }} style={{fontSize: '18px'}}>
                          <DeleteOutlined />
                      </Button>
                      {
                          (!['1', 1].includes(record.runResult)) &&
                          <Button type="link" tooltip="取消" onClick={()=>{ this.onCancelRecords(record) }} style={{fontSize: '18px'}}>
                              <CloseCircleOutlined />
                          </Button>
                      }

                  </div>
              ),
          }
      ];

      //表数据
      const dataSource = rows && rows.map((v, i)=>{
          v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
          return v;
      });

      console.log('task_manage:', TaskManageData)


    return (
      <Layout className="">
          <Card title="">
              <Header>
                  <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={()=>{this.onFinishFailed()}}>
                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="起止日期：" name="datepicker">
                                  <RangePicker
                                      defaultValue={[moment(new Date((new Date().getTime() - (5 * 24*60*60*1000))).toLocaleDateString()), moment(new Date().toLocaleDateString()), dateFormat]}
                                      className={style.antPickerRange} />
                              </Form.Item>
                          </Col>

                      </Row>

                      <Row gutter={16}>
                          <Col span={6}>
                              <Form.Item label="任务编号：" name="taskCode">
                                  <Input placeholder="请输入任务编号" autoComplete='off' />
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="任务类型：" name="taskType">
                                  <Select defaultValue="" onChange={()=>{this.handleChange()}} placeholder="请选择任务类型">
                                      {
                                          typeOptions && typeOptions.map((v, i)=>{
                                              return <Option key={v.dictValue} value={v.dictValue}>{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                          <Col span={6}>
                              <Form.Item label="优先级：" name="taskLevel">
                                  <Select defaultValue="" onChange={()=>{this.handleChange()}} placeholder="请选择优先级">
                                      {
                                          levelOptions && levelOptions.map((v, i)=>{
                                              return <Option key={v.dictValue} value={v.dictValue}>{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                          </Col>
                      </Row>

                      <Row gutter={16}>
                          <Button type="primary" className={style.btnAction}  htmlType="submit">查询</Button>
                          <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                          <Button type="default" className={style.btnAction} onClick={()=>{this.onEdit()}}>新增</Button>
                      </Row>

                  </Form>
              </Header>

              <Divider />

              <Content className={style.className}>

                  <div>
                      <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />
                  </div>

                  {/*新增/修改页面弹框*/}
                  <Modal
                      destroyOnClose
                      title={formData.taskId ? '修改' : '新增'}
                      width="680px"
                      okText="保存"
                      visible={visible}
                      confirmLoading={confirmLoading}
                      onOk={()=>{this.handleOk(formData)}}
                      onCancel={()=>{this.handleCancel()}}
                  >
                      <div>

                          <Form>
                              <Form.Item label="任务编号："  {...formItemLayout}>
                                  <Input defaultValue={formData.taskCode} onChange={(val)=>{this.handleInput(val, 'taskCode')}} disabled placeholder="请输入任务编号" />
                              </Form.Item>
                              <Form.Item label="任务类型：" {...formItemLayout}>
                                  <Select defaultValue={formData.taskType} onChange={(val)=>{this.handleChange(val, 'taskType')}} placeholder="请选择任务类型">
                                      {
                                          typeOptions && typeOptions.map((v, i)=>{
                                              return <Option key={v.dictValue} value={v.dictValue}>{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                              <Form.Item label="优先级：" {...formItemLayout}>
                                  <Select defaultValue={formData.taskLevel} onChange={(val)=>{this.handleChange(val, 'taskLevel')}} placeholder="请选择优先级">
                                      {
                                          levelOptions && levelOptions.map((v, i)=>{
                                              return <Option key={v.dictValue} value={v.dictValue}>{v.dictLabel}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                              <Form.Item label="起始位置：" {...formItemLayout}>
                                  <Select defaultValue={formData.loc1} onChange={(val)=>{this.handleChange(val, 'loc1')}} placeholder="请输入起始位置">
                                      {
                                          locOptions && locOptions.map((v, i)=>{
                                              return <Option key={v.locationId} value={v.locationId}>{v.locationName}</Option>
                                          })
                                      }
                                  </Select>
                              </Form.Item>
                              <Form.Item label="目的位置：" {...formItemLayout}>
                                  <Select defaultValue={formData.loc2} onChange={(val)=>{this.handleChange(val, 'loc2')}} placeholder="请输入目的位置">
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


