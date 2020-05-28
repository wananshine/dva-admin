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
        console.log('this.props',this.props);
        const { productLine, dispatch } = this.props;
        const { proLoc } = productLine;
        const { pageNum, pageSize } = proLoc;

        dispatch({
            type: 'productLine/getPageInfo2',
            payload: {
                lineId: info.lineId
            }
        });
        dispatch({
            type: 'productLine/getPageInfo',
            payload: {
                pageNum: 1,
                pageSize: pageSize || 10,
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
                        {/*<Button type="danger" className={style.btnAction} onClick={()=>{this.onSaveLine()}}>保存Line</Button>*/}
                        <Button type="danger" className={style.btnAction} onClick={()=>{this.onSaveLoc()}}>保存</Button>
                    </Header>

                    <Divider />

                    <Content>
                        <Row gutter={16}>

                            <Col  span={4}>
                                {/*line*/}
                                {
                                    proLine && <TabLineBox {...proLine} {...this.props} {...this.state} onTabSelect={this.onTabSelect}></TabLineBox>
                                }

                            </Col>

                            <Col span={20}>
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

const  TabLineBox = (props)=>{
    console.log('TabLineBox:', props);
    const { pageData, pageNum, pageSize, dispatch, onTabSelect } = props;
    const { total, rows } = pageData;


    const [defaultSelectedKeys, setSelectedKey] = useState(() => {
        const d = rows && rows[0] && rows[0];
        const initialState = onTabSelect([d.lineId], d);
        dispatch({
            type: 'productLine/getPageInfo2',
            payload: {
                lineId: d.lineId
            }
        });
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
