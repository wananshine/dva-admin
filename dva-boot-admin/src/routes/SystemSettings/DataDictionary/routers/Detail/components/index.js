import React from 'react';
import { connect } from 'dva';
import { Layout, Descriptions } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;

@connect(({ DataDictDetail, loading }) => ({
    DataDictDetail,
    loading: loading.models.DataDictDetail
}))

export default class extends BaseComponent {


  render() {
      const { DataDictDetail, loading, dispatch } = this.props;
      const { dictInfo } = DataDictDetail;
      console.log('DataDictDetail:',DataDictDetail)

    return (
      <Layout className="full-layout page blank-page">
          {
              dictInfo ?
                  <Content>
                      <Descriptions title={dictInfo.dictType}>
                          <Descriptions.Item label="createBy">{dictInfo.createBy}</Descriptions.Item>
                          <Descriptions.Item label="dictLabel">{dictInfo.dictLabel}</Descriptions.Item>
                          <Descriptions.Item label="dictValue">{dictInfo.dictValue}</Descriptions.Item>
                          <Descriptions.Item label="createTime">{dictInfo.createTime}</Descriptions.Item>
                          <Descriptions.Item label="remark">{dictInfo.remark}</Descriptions.Item>
                          <Descriptions.Item label="status">{dictInfo.status}</Descriptions.Item>
                      </Descriptions>
                  </Content>
                  :
                  <Content>&nbsp;</Content>
          }

      </Layout>
    );
  }
}
