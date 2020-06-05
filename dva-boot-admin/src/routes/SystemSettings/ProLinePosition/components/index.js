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

@connect(({ productLine, loading }) => ({
    productLine,
    loading: loading.models.productLine
}))

export default class extends BaseComponent {

    formRef = React.createRef();

    state = {
        locationIds: []
    };


    onChange(pageNumber, pageSize) {
        console.log('Page: ', pageNumber, pageSize);
    }

    onSaveLoc(){
        const { productLine, dispatch } = this.props;
        const { proLoc, proLocSelectedKeys } = productLine;
        const pageLocData = proLoc && proLoc.pageData || {};
        const { lineId } = proLocSelectedKeys;

        dispatch({
            type: 'productLine/save',
            payload: [{
                "lineId": lineId ? lineId : pageLocData.rows && pageLocData.rows[0] && pageLocData.rows[0].lineId,
                "locationIds": this.state.locationIds
            }]
        });
        this.setState({
            ...this.state,
        })

    }

    onTabSelect = (selectedKeys, info) => {
        console.log('this.props',selectedKeys, info);
        const { productLine, dispatch } = this.props;
        const { proLoc } = productLine;
        const { pageNum, pageSize } = proLoc;

        dispatch({
            type: 'productLine/getPageInfo',
            payload: {
                pageNum: 1,
                pageSize: pageSize || 10,
            }
        });

        dispatch({
            type: 'productLine/getPageInfo2',
            payload: {
                lineId: info.lineId
            }
        });

        console.log('onTabSelect',this);
    };

    onCheckBox = (keys)=>{
        this.setState({
            ...this.state,
            locationIds: keys
        });
    };


    render() {

        const { productLine, dispatch } = this.props;
        const { proLine, proLoc, proLocSelectedKeys } = productLine;



        return (
            <Layout className="">

                <Card>
                    <Header>
                        <Button type="danger" className={style.btnAction} onClick={()=>{this.onSaveLoc()}}>保存</Button>
                    </Header>

                    <Divider />

                    <Content>
                        <Row gutter={16}>

                            <Col span={4}>
                                {/*line*/}
                                {
                                    proLine && <TabLineBox  {...proLine} {...this.props} {...this.state} onTabSelect={this.onTabSelect}></TabLineBox>
                                }
                            </Col>

                            <Col span={1} style={{display: 'none'}} />
                            <Col span={3} style={{display: 'none'}} >
                                {/*line*/}
                                {
                                    proLine && <TabLineInner {...proLine} {...this.props} {...this.state} onTabSelect={this.onTabSelect}></TabLineInner>
                                }
                            </Col>

                            <Col span={19}>
                                {/*loc*/}
                                {
                                    proLoc && proLocSelectedKeys && <TableGrid {...this.props} {...this.state} onCheckBox={this.onCheckBox}></TableGrid>
                                }
                            </Col>

                        </Row>
                    </Content>
                </Card>
            </Layout>
        );
    }
}

const TabLineInner = (props)=>{

    const { pageData, dispatch, onTabSelect } = props;
    const { rows } = pageData;

    const defaultActiveKey = (rows && rows[0] && rows[0].lineId).toString() || 1 ;

    return(
        <div>
            <Tabs defaultActiveKey={defaultActiveKey} tabPosition="left" onTabClick={(selectedKeys, info)=>{onTabSelect(selectedKeys, { lineId: selectedKeys })}} style={{ height: 610 }}>
                {
                    rows && rows.map((v, i) => (
                        <TabPane
                            tab={
                                <span>
                                  <CarryOutOutlined />
                                    {`产线${v.lineName}`}
                                </span>
                            }
                            key={v.lineId}
                        />
                    ))
                }
            </Tabs>
        </div>
    )
};

const  TabLineBox = (props)=>{

    const { pageData, dispatch, onTabSelect } = props;
    const { rows } = pageData;


    const [defaultSelectedKeys] = useState(() => {
        const d = rows && rows[0] && rows[0];
        dispatch({
            type: 'productLine/getPageInfo2',
            payload: {
                lineId: d.lineId
            }
        });
        // const initialState = onTabSelect([d.lineId], d);
        return d.lineId;
    });

    useEffect(() => {});

    const treeData = rows && rows.map((v, i)=>{
        v.icon = <CarryOutOutlined  />;
        v.title = `产线${v.lineName}`;
        v.key =  i.toString() + v.lineId;
        v.children = [];
        return v;
    });


    return(
        <Card>
            <Tree
                showIcon
                blockNode
                // switcherIcon={<CarryOutOutlined  />}
                defaultSelectedKeys={['0'+defaultSelectedKeys]}
                defaultExpandedKeys={['0'+defaultSelectedKeys]}
                treeData={treeData}
                onSelect={(selectedKeys, { node })=>{onTabSelect(selectedKeys, node)}}
            />
        </Card>
    )
};



const TableGrid = (props)=>{
    console.log('TableGrid:', props);
    const { productLine, onCheckBox, loading, dispatch } = props;
    const { proLoc, proLocSelectedKeys } = productLine;
    const { pageData, pageNum, pageSize } = proLoc;
    const { total, rows } = pageData;
    const { selectKeys, lineId } = proLocSelectedKeys;
    const defaultKey = selectKeys && selectKeys.rows.map((v, i)=>{
        return v.locationId;
    });

    const [selectedRowKeys, setSelectionRowKeys] = useState(defaultKey);
    useEffect(() => {
        setSelectionRowKeys(defaultKey);
    }, [lineId]);


    console.log('selectedRowKeys2:',selectedRowKeys, defaultKey);

    //表头
    const columns = [
        {
            title: '位置名称',
            key: 'locationName',
            dataIndex: 'locationName',
        },
        // {
        //     title: '位置ID',
        //     key: 'locationId',
        //     dataIndex: 'locationId',
        // }
    ];

    //表数据
    const dataLocSource = rows && rows.map((v, i)=>{
        v.key =  Number(i + 1) + (Number(pageNum) * Number(pageSize));
        return v;
    });

    const rowSelection = {
        type: 'checkbox',
        selectedRowKeys,
        onChange: (selectedRowKeys, selectedRows) => {
            onCheckBox(selectedRowKeys);
            setSelectionRowKeys(selectedRowKeys);
            console.log(`selectedKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
            // disabled: record.name === 'Disabled User',
            name: record.name,
        }),
    };

    const onChange = (pageNumber, pageSize)=>{
        dispatch({
            type: 'productLine/getPageInfo',
            payload: {
                pageNum: pageNumber,
                pageSize: pageSize
            }
        });
        console.log('Page: ', pageNumber, pageSize);
    };

    return(
        <div>
            {
                pageData ?

                <Content>

                    <Table
                        bordered
                        rowSelection={rowSelection}
                        rowKey={record => record.locationId}
                        loading={loading}
                        pagination={false}
                        columns={columns}
                        dataSource={dataLocSource}
                    />
                    <br/>
                    <Footer>
                        <Pagination
                            hideOnSinglePage
                            showQuickJumper
                            showSizeChanger
                            current={pageNum}
                            defaultCurrent={pageNum}
                            total={total}
                            onShowSizeChange={(pageNumber, pageSize)=>{onChange(pageNumber, pageSize)}}
                            onChange={(pageNumber, pageSize)=>{onChange(pageNumber, pageSize)}}
                        />
                    </Footer>

                </Content> : <Content>&nbsp;</Content>
            }

        </div>
    )
}
