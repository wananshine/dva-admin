import React from 'react';
import { connect } from 'dva';
import { BulbOutlined } from '@ant-design/icons';
import { Layout, Button } from 'antd';
import BaseComponent from 'components/BaseComponent';
import Panel from 'components/Panel';
const { Content } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout page column-page">
        <Content>
          <Panel title="说明">
            <h3>Column 语法</h3>
            <Button
              icon={<BulbOutlined />}
              type="primary"
              onClick={_ => this.history.push('/crud')}
            >
              CRUD页面
            </Button>
          </Panel>
        </Content>
      </Layout>
    );
  }
}
