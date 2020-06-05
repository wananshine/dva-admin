import React, { useState, useEffect, useContext, useImmer, useRef }from 'react';
import { connect } from 'dva';
import { Layout, Card, Tabs, Row, Col, Form, Input, Button, Table, Radio, Divider, Tag, Space, Pagination, Tree   } from 'antd';
import { CaretRightOutlined, CarryOutOutlined  } from '@ant-design/icons';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import createColumns from "./columns";
// import TreeList, { TreeList2 } from "./tree"
const { Header, Content, Footer, Slider } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;
const { TreeNode, DirectoryTree } = Tree;
import style from './index.module.less';
import './index.less';

@connect(({ LineInformation, loading }) => ({
    LineInformation,
    loading: loading.models.LineInformation
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {};

    //save
    onFinish = values => {
        const { dispatch } = this.props;
        dispatch({
            type: 'LineInformation/save',
            payload:  values
        });
        this.formRef.current.setFieldsValue({
            "dictLabel": "",
            "dictValue": "",
            "remark": ""
        });
    };


    //分页
    onChange(pageNumber, pageSize) {
        const { dispatch } = this.props;
        dispatch({
            type: 'LineInformation/getPageInfo',
            payload:  {
                pageNum: pageNumber,
                pageSize: pageSize
            }
        });
        console.log('Page: ', pageNumber, pageSize);
    }


    render() {

        const { LineInformation, loading, dispatch } = this.props;
        const { pageData, pageNum, pageSize, total, employees } = LineInformation;

        //表数据
        const dataSource = pageData && pageData.map((v, i)=>{
            v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - Number(pageSize);
            return v;
        });

        //表头
        const columns = createColumns(this, employees);

        return (
            <Layout className="">

                <Card>
                    <Header>
                        <Form ref={this.formRef} onFinish={this.onFinish} initialValues={
                            {'locationName': this.state.locationName}
                        }>
                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="产线名称：" name="dictLabel" >
                                        <Input placeholder="请输入产线名称" autoComplete="off"/>
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Col span={6}>
                                    <Form.Item label="产线编码：" name="dictValue" >
                                        <Input placeholder="产线编码" autoComplete="off" />
                                    </Form.Item>
                                </Col>
                                <Col span={6}>
                                    <Form.Item label="备注："  name="remark">
                                        <Input placeholder="请输入备注" autoComplete="off" />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row gutter={16}>
                                <Button type="danger" className={style.btnAction} htmlType="submit">保存</Button>
                            </Row>

                        </Form>
                    </Header>

                    <Divider />

                    <Content>
                        <Table loading={loading} pagination={false} columns={columns} dataSource={dataSource} bordered size="middle" />
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
