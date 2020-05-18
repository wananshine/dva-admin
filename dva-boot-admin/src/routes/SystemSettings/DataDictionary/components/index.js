import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, Input, Button, Select, Modal, Table, Space, Pagination   } from 'antd';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
import createColumns from "./columns";
const { Header, Content, Footer } = Layout;
const { Option } = Select;

@connect(({ RulesManage, loading }) => ({
    RulesManage,
    loading: loading.models.RulesManage
}))

export default class extends BaseComponent {

    formRef = React.createRef();

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
            type: 'RulesManage/remove',
            payload: record
        });
        console.log('record:',record)
    };

    //del确认警告
    onShowModal = record =>{
        const _this = this;
        Modal.warning({
            title: '删除提示',
            content: '是否确认删除此笔数据？',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                _this.onDelete(record);
            }
        });
    };

    onUpdate = ()=>{
        const { dispatch } = this.props;
        dispatch({
            type: 'RulesManage/save',
            payload: {
                "dictType": values.dictType,
                "dictLabel": values.dictLabel,
                "dictValue": values.dictLabel,
                "remark":"产线-90"
            }
        });
    }

    //update
    onEditModal = record =>{
        const { dispatch } = this.props;
        Modal.confirm({
            title: record ? <h2>修改</h2> : <h2>新增</h2>,
            icon: "",
            width: '660px',
            content: <ModalUpdate {...this.props} record={record} />,
            onOk() {
                console.log('Modal:',Modal)
            },
            // okButtonProps: {
            //     style: { display: 'none' },
            // },
            // cancelButtonProps: {
            //     style: { display: 'none' },
            // }
        });
    };


    //分页
    onChange(pageNumber, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'RulesManage/getPageInfo',
            payload: {
                pageNum: pageNumber,
                pageSize: pageSize
            }
        });
        console.log('Page: ', pageNumber, pageSize);
    }

    //
    handleChange(value) {
        console.log(`selected ${value}`);
    }

    //查询
    onFinish = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'RulesManage/getPageInfo',
            payload: {
                ...values,
                pageNum: 1,
                pageSize: 10
            }

        });
        console.log('nohave')
    };

    onFinishFailed(errorInfo) {
        console.log('Failed:', errorInfo);
    }

    render() {

        const { RulesManage, loading, dispatch } = this.props;
        const { pageData, pageNum, pageSize, options, employees } = RulesManage;
        const { total, rows } = pageData;

        console.log('RulesManage:',RulesManage)

        //表数据
        const dataSource = rows && rows.map((v, i)=>{
            v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - 10;
            return v;
        });

        //表头
        const columns = createColumns(this, employees);

        return (
            <Layout className="">

                <Card title="">
                    <Header>
                        <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={()=>{this.onFinishFailed()}}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="数据类型：" name="type">
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
                                    <Form.Item label="数据代码：" name="code">
                                        <Input placeholder="请输入数据代码" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="数据名称："  name="name">
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

                    <Content className={style.className}>
                        <br />
                        <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />
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


const ModalUpdate = (props)=>{
    console.log('ModalUpdate',props);
    const { dispatch, record, RulesManage} = props;
    const { options } = RulesManage;
    const onSave = (values)=>{
        dispatch({
            type: 'RulesManage/save',
            payload: {
                "dictType": values.dictType,
                "dictLabel": values.dictLabel,
                "dictValue": values.dictLabel,
                "remark":"产线-90"
            }
        });
    };

    const onUpdate = ()=>{
        dispatch({
            type: 'RulesManage/save',
            payload: {
                "dictCode": record.dictCode,
                "dictType": "warehouse_line",
                "dictLabel": "980",
                "dictValue": "980",
                "remark":"产线-980"
            }
        });
    };

    return(
        <div>
            <Form onFinish={record ? onUpdate : onSave}>
                <Form.Item label="数据类型：" name="dictType">
                    <Select defaultValue="">
                        {
                            options && options.map((item, i)=>{
                                return (<Option key={item.dictType} value={item.dictType}>{item.dictName}</Option>)
                            })
                        }
                    </Select>
                </Form.Item>
                <Form.Item label="数据代码：" name="code">
                    <Input placeholder="请输入数据代码" />
                </Form.Item>
                <Form.Item label="数据名称："  name="dictLabel">
                    <Input placeholder="请输入数据名称" />
                </Form.Item>
                <Form.Item>
                    <Button type='primary' htmlType='submit'>确认</Button>
                </Form.Item>
            </Form>

        </div>
    )
}
