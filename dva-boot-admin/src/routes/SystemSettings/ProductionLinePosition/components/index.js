import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Tabs, Row, Col, Form, Input, Button, Table, Tag, Space, Pagination, Tree   } from 'antd';
import moment from 'moment';
import BaseComponent from 'components/BaseComponent';
import style from './index.module.less';
import createColumns from "./columns";
import TreeList, { TreeList2 } from "./tree"
const { Header, Content, Footer, Slider } = Layout;
const { Search } = Input;
const { TabPane } = Tabs;


@connect(({ productLine, loading }) => ({
    productLine,
    loading: loading.models.productLine
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
        formData: {},
        mode: 'top',
        lineId: "",
        selectedRowKeys: []
    };


    onChange(pageNumber, pageSize) {
        console.log('Page: ', pageNumber, pageSize);
    }

    onSaveLine() {
        const { dispatch } = this.props;
        dispatch({
            type: 'productLine/keep',
            payload: {
                "dictType": "warehouse_line",
                "dictLabel": "70",
                "dictValue": "70",
                "remark":"产线-70"
            }
        });
    };

    onSaveLoc(){
        const { lineId, selectedRowKeys } = this.state;

        const { productLine, dispatch } = this.props;
        const { proLoc } = productLine;
        const pageLocData = proLoc && proLoc.pageData || {};

        dispatch({
            type: 'productLine/save',
            payload: [{
                "lineId": lineId ? lineId : pageLocData.rows && pageLocData.rows[0] && pageLocData.rows[0].lineId,
                "locationIds": selectedRowKeys
            }]
        });
        this.setState({
            ...this.state,
            selectedRowKeys: []
        })

    }

    onTabClick = val => {
        console.log(val)
        this.setState({
            ...this.state,
            lineId: val
        });
    }

    onSelectChange = selectedRowKeys => {
        console.log('selectedRowKeys changed: ', selectedRowKeys);
        this.setState({ selectedRowKeys });
    };


    render() {

        const { selectedRowKeys } = this.state;
        const { productLine, loading, dispatch } = this.props;
        const { pageNum, pageSize, proLine, proLoc, employees } = productLine;
        const pageLineData = proLine && proLine.pageData || {};
        const pageLocData = proLoc && proLoc.pageData || {};
        const locPageNum = proLoc && proLoc.pageData.pageNum || '';
        const locPageSize = proLoc && proLoc.pageData.pageSize || '';
        console.log('&&&&&&&&&&:', productLine, pageLineData, pageLocData);

        //tab line数据
        const dataLineSource = pageLineData.rows && pageLineData.rows.map((v, i)=>{
            v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize)) - 10;
            return v;
        });

        //tab loc数据
        const dataLocSource = pageLocData.rows && pageLocData.rows.map((v, i)=>{
            v.key =  Number(i + 1) + (Number(locPageNum) * Number(locPageSize));
            return v;
        });

        //表头
        const columns = createColumns(this, employees);


        //表 checkbox
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            hideDefaultSelections: true,
            defaultChecked: true,
            getCheckboxProps: record => ({
                receiveStatus: record.locationId
            })
        };


        return (
            <Layout className="">
                <Card title="">

                    <Header>
                        <Button type="danger" className={style.btnAction} onClick={()=>{this.onSaveLine()}}>保存Line</Button>
                        <Button type="danger" className={style.btnAction} onClick={()=>{this.onSaveLoc()}}>保存Loc</Button>
                    </Header>

                    <br/>

                    <Content className={style.className}>

                        <Card bordered>
                            <Row>

                                <Col span={24}>
                                    {
                                        dataLocSource &&
                                        <Tabs defaultActiveKey='0' tabPosition="left"  onChange={this.onTabClick} style={{ height: 400 }} >
                                            {
                                                dataLocSource.map((item, i)=>{
                                                    return (
                                                        <TabPane tab={`产线 ${item.lineName}`} key={item.lineId} >
                                                            <Table loading={loading} pagination={false} rowSelection={rowSelection} rowKey={(record)=>record.locationId} columns={columns} dataSource={item.locations} bordered size="middle" />
                                                        </TabPane>
                                                    )
                                                })
                                            }
                                        </Tabs>
                                    }
                                    {/*<TreeList {...this.props} />*/}
                                    {/*<TreeList2 {...this.props} />*/}
                                </Col>

                                <Col span={22}>
                                    <div>

                                    </div>
                                </Col>

                            </Row>
                        </Card>

                    </Content>

                    <Footer>
                        {/*<Pagination*/}
                            {/*hideOnSinglePage*/}
                            {/*showQuickJumper*/}
                            {/*showSizeChanger*/}
                            {/*defaultCurrent={1}*/}
                            {/*total={1000}*/}
                            {/*onShowSizeChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}*/}
                            {/*onChange={(pageNumber, pageSize)=>{this.onChange(pageNumber, pageSize)}}*/}
                        {/*/>*/}
                    </Footer>

                </Card>
            </Layout>
        );
    }
}
