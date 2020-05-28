import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, Input, Button, Select, Modal, Divider, Table, Space, Pagination   } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
import createColumns from "./columns";
const { Header, Content, Footer } = Layout;
const { Option } = Select;

@connect(({ DataDictionary, loading }) => ({
    DataDictionary,
    loading: loading.models.DataDictionary
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
        visible: false,
        confirmLoading: false,
        formData: {}
    };

    onSearch(){
        console.log('搜索')
    }

    //重置
    onReset(){
        this.formRef.current.resetFields();
    }

    //del确认删除
    onDelete = record =>{
        const { dispatch } = this.props;
        dispatch({
            type: 'DataDictionary/remove',
            payload: record
        });
        console.log('record:',record)
    };

    //del确认警告
    onShowModal = record =>{
        const _this = this;
        Modal.confirm({
            title: '删除提示',
            content: '是否确认删除此笔数据？',
            icon: <ExclamationCircleOutlined />,
            okText: '确认',
            cancelText: '取消',
            onOk(){
                _this.onDelete(record);
            }
        });
    };

    onUpdate = ()=>{
        const { dispatch } = this.props;

    };


    //新增 && 修改 Modal Show
    onEditModal = record =>{
        this.setState({
            ...this.state,
            formData: (record && {
                "dictCode":record.dictCode,
                "dictType": record.dictType,
                "dictLabel": record.dictLabel,
                "dictValue": record.dictValue,
                "remark": record.remark || ''
            }) || {},
            visible: true
        })
    };

    //新增 && 修改 Modal Hide
    handleCancel(){
        this.setState({
            ...this.state,
            visible: false,
            formData: {}
        });
    }

    //新增 && 修改 确认
    handleOk(formData){
        console.log('formData:',formData);
        const { dictCode } = formData;
        const { dispatch } = this.props;
        if(dictCode){
            dispatch({
                type: 'DataDictionary/update',
                payload: formData
            });
        }else{
            dispatch({
                type: 'DataDictionary/save',
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

    handleChange(val, key){
        this.setState({
            ...this.state,
            formData: {
                ...this.state.formData,
                [key]: val,
            }
        });
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
    }


    //分页
    onChange(pageNumber, pageSize) {
        const { DataDictionary, dispatch } = this.props;
        dispatch({
            type: 'DataDictionary/getPageInfo',
            payload: {
                ...DataDictionary,
                pageNum: pageNumber,
                pageSize: pageSize,
            }
        });
        console.log('Page: ', pageNumber, pageSize);
    }


    //查询
    onFinish = values => {
        console.log('values:',values)
        const { dispatch } = this.props;
        dispatch({
            type: 'DataDictionary/getPageInfo',
            payload: {
                dictLabel: values.dictLabel || '',
                dictType: values.dictType || '',
                dictValue: values.dictValue || '',
                pageNum: 1,
                pageSize: 10
            }

        })
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {

        const { formData, visible, confirmLoading } = this.state;
        const { DataDictionary, loading, dispatch } = this.props;
        const { pageData, pageNum, pageSize, options, employees } = DataDictionary;
        const { total, rows } = pageData;

        console.log('DataDictionary:',DataDictionary);

        //表数据
        const dataSource = rows && rows.map((v, i)=>{
            v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
            return v;
        });

        //表头
        const columns = createColumns(this, employees);

        return (
            <Layout className="">
                <Card>
                    <Header>
                        <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={()=>{this.onFinishFailed()}}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="数据类型：" name="dictType">
                                        <Select defaultValue="" onChange={(value)=>{this.handleChange(value)}}>
                                            {
                                                options && options.map((item, i)=>{
                                                    return (<Option key={item.dictType} value={item.dictType}>{item.dictName}</Option>)
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="数据代码：" name="dictValue">
                                        <Input placeholder="请输入数据代码" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="数据名称："  name="dictLabel">
                                        <Input placeholder="请输入数据名称" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Button type="primary" className={style.btnAction} htmlType="submit">查询</Button>
                                <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>重置</Button>
                                <Button type="danger" className={style.btnAction} onClick={()=>{this.onEditModal()}}>新增</Button>
                            </Row>

                        </Form>
                    </Header>

                    <Divider />

                    <Content className={style.className}>

                        <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />

                        <Modal
                            title={ formData.dictCode ? '修改' : '新增' }
                            destroyOnClose
                            okText="保存"
                            visible={visible}
                            confirmLoading={confirmLoading}
                            onOk={()=>{this.handleOk(formData)}}
                            onCancel={()=>{this.handleCancel()}}
                        >
                            <Form refs="dicModal">
                                <Form.Item label="数据类型：" name="dictType">
                                    <Select defaultValue={formData.dictType} onChange={(val)=>{this.handleChange(val, 'dictType')}}>
                                        {
                                            options && options.map((item, i)=>{
                                                return (<Option key={item.dictType} value={item.dictType}>{item.dictName}</Option>)
                                            })
                                        }
                                    </Select>
                                </Form.Item>
                                <Form.Item label="数据代码：" name="dictValue">
                                    <Input defaultValue={formData.dictValue} onChange={(val)=>{this.handleInput(val, 'dictValue')}} placeholder="请输入数据代码" autoComplete="off" />
                                </Form.Item>
                                <Form.Item label="数据名称："  name="dictLabel">
                                    <Input defaultValue={formData.dictLabel} onChange={(val)=>{this.handleInput(val, 'dictLabel')}} placeholder="请输入数据名称" autoComplete="off" />
                                </Form.Item>
                            </Form>
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
                            total={total || 0}
                            onShowSizeChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}
                            onChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}
                        />
                    </Footer>
                </Card>
            </Layout>
        );
    }
}

