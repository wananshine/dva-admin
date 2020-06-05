import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, Input, Button, Divider, Table, Space, Pagination, Modal   } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
import createColumns from "./columns";
const { Header, Content, Footer } = Layout;


@connect(({ LocInformation, loading }) => ({
    LocInformation,
    loading: loading.models.LocInformation
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
        "locationId": ''
    };

    onChange(pageNumber, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'LocInformation/getPageInfo',
            payload: {
                pageNum: pageNumber,
                pageSize: pageSize
            }
        });
        console.log('Page: ', pageNumber, pageSize);
    }

    //save
    onFinish = values => {
        const { dispatch } = this.props;
        const { locationId } = this.state;
        dispatch({
            type: [undefined, null, ''].includes(locationId) ? 'LocInformation/save' : 'LocInformation/update',
            payload: [undefined, null, ''].includes(locationId) ? values : { ...values, ...{ locationId: this.state.locationId  }}
        });
        this.formRef.current.setFieldsValue({
            "locationId": '',
            "locationName": '',
            "locX": '',
            "locY": ''
        });
    };

    //update
    onEdit = record =>{
        this.formRef.current.setFieldsValue({
            "locationId": record.locationId,
            "locationName": record.locationName,
            "locX": record.locX,
            "locY": record.locY
        });

        this.setState({
            ...this.state,
            "locationId": record.locationId,
        });
        console.log('onEdit', this.state)
    }

    //del确认删除
    onDelete = record =>{
        const { dispatch } = this.props;
        dispatch({
            type: 'LocInformation/remove',
            payload: record
        });
        console.log(record)
    };

    onCancel = ()=>{};

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
            },
            onCancel(){}
        });
    };

    render() {

        const { LocInformation, loading, dispatch } = this.props;
        const { pageData, pageNum, pageSize, employees } = LocInformation;
        const { total, rows } = pageData;

        //表数据
        const dataSource = rows && rows.map((v, i)=>{
            v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
            return v;
        });

        //表头
        const columns = createColumns(this, employees);


        return (
            <Layout className="">
                <Card title="">
                    <Header>
                        <Form ref={this.formRef} onFinish={this.onFinish} initialValues={
                            {'locationName': this.state.locationName}
                        }>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="位置名称：" name="locationName" autoComplete="off">
                                        <Input placeholder='请输入位置名称'/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="位置 X 轴：" name="locX">
                                        <Input value={this.state.locX} placeholder="请输入X轴" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="位置 Y 轴："  name="locY">
                                        <Input value={this.state.locY} placeholder="请输入Y轴" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Button type="danger" className={style.btnAction} htmlType="submit">保存</Button>
                            </Row>

                        </Form>
                    </Header>

                    <Divider />

                    <Content className={style.className}>

                        <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />

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
