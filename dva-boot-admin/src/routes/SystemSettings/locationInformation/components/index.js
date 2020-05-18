import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, Input, Button, Table, Space, Pagination, Modal   } from 'antd';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
import createColumns from "./columns";
const { Header, Content, Footer } = Layout;


@connect(({ LocationInformation, loading }) => ({
    LocationInformation,
    loading: loading.models.LocationInformation
}))

export default class extends BaseComponent {
    formRef = React.createRef();

    state = {
        "locationId": ''
    }

    onSearch(){
        console.log('搜索')
    }

    onChange(pageNumber, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'LocationInformation/getPageInfo',
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
            type: [undefined, null, ''].includes(locationId) ? 'LocationInformation/save' : 'LocationInformation/update',
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
            type: 'LocationInformation/remove',
            payload: record
        });
        console.log(record)
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
    }

    render() {

        const { LocationInformation, loading, dispatch } = this.props;
        const { pageData, pageNum, pageSize, employees } = LocationInformation;
        const { total, rows } = pageData;

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
                        <Form ref={this.formRef} onFinish={this.onFinish} initialValues={
                            {'locationName': this.state.locationName}
                        }>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="位置名称：" name="locationName">
                                        <Input placeholder='请输入位置名称'/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="X轴：" name="locX">
                                        <Input value={this.state.locX} placeholder="请输入X轴" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="Y轴："  name="locY">
                                        <Input value={this.state.locY} placeholder="请输入Y轴" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Button type="danger" className={style.btnAction} htmlType="submit">保存</Button>
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
