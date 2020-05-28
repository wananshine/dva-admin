import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Row, Col, Form, DatePicker, Input, Button, Divider, Table, Tag, Space, Pagination   } from 'antd';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
const { Header, Content, Footer } = Layout;

const { RangePicker } = DatePicker;

@connect()

export default class extends BaseComponent {


    onReset(){
        console.log(1)
    }

    render() {

        const { loading } = this.props;

        const dateFormat = 'YYYY/MM/DD';

        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 16 },
        };

        const columns = [
            {
                title: '顺番',
                dataIndex: 'name',
                render: (tags) => (
                    <span style={{textAlign: 'center'}}>{tags}</span>
                ),
            },
            {
                title: '品名',
                dataIndex: 'age',
            },
            {
                title: 'Line',
                dataIndex: 'address',
            },
            {
                title: 'LotNo',
                dataIndex: 'address',
            },
            {
                title: '日期',
                dataIndex: 'address',
            },
            {
                title: '时间',
                dataIndex: 'address',
            }
        ];
        const data = [
            {
                key: '1',
                name: 'John Brown',
                age: 32,
                address: 'New York No. 1 Lake Park',
            },
            {
                key: '2',
                name: 'Jim Green',
                age: 42,
                address: 'London No. 1 Lake Park',
            },
            {
                key: '3',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '4',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '5',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            },
            {
                key: '6',
                name: 'Joe Black',
                age: 32,
                address: 'Sidney No. 1 Lake Park',
            }
        ];

        return (
            <Layout className="">
                <Card title="">

                    <Header>
                        <Form {...formItemLayout}>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="编码：">
                                        <Input placeholder="请输入编码" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="名称：">
                                        <Input placeholder="请输入名称" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="岗位：">
                                        <Input placeholder="请输入岗位" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="权限范围：">
                                        <Input placeholder="请输入权限范围" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="电话：">
                                        <Input placeholder="请输入电话" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="备注：">
                                        <Input placeholder="请输入备注" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row>
                                <Button type="primary" className={style.btnAction} >新增</Button>
                                <Button type="danger" className={style.btnAction} onClick={()=>{this.onReset()}}>保存</Button>
                                <Button type="primary" className={style.btnAction} >修改</Button>
                                <Button type="primary" className={style.btnAction} >删除</Button>
                                <Button type="primary" className={style.btnAction} >提交</Button>
                            </Row>
                        </Form>
                    </Header>

                    <Divider />

                    <Content className={style.className}>
                        <div>
                            <h4></h4>
                            <Table loading={loading} pagination={false} columns={columns} dataSource={data} bordered size="middle" />
                        </div>
                    </Content>

                </Card>

            </Layout>
        );
    }
}
