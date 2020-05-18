import React, { Component } from 'react';
import { connect, router } from 'dva';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Form } from '@ant-design/compatible';
import '@ant-design/compatible/assets/index.css';
import { Layout, Button, Input, Checkbox, Spin } from 'antd';
import logoImg from 'assets/images/logo1.png';
import './index.less';
const { Link } = router;
const { Content } = Layout;
const FormItem = Form.Item;

@connect(({ login, loading }) => ({
  login,
  loading: loading.models.login
}))
class Login extends Component {



  handleSubmit = e => {
    const { login, form, dispatch } = this.props;
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log('values',values);
        dispatch({
          type: 'login/login',
          payload: {...values, uuid: login.user.uuid}
        });
      }
    });
  };

  render() {
      console.log('this.props：',this.props)
    const { login, loading, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Layout className="full-layout login-page">
        <Content>
          <Spin tip="登录中..." spinning={!!loading}>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <div className="user-img">
                <img src={logoImg} alt="logo" />
                <b>蒋海萍</b>
                <span></span>
              </div>
              <FormItem>
                {getFieldDecorator('username', {
                  initialValue: 'admin',
                  rules: [{ required: true, message: '请输入您的用户名，示例admin' }]
                })(
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="用户名"
                  />
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('password', {
                  initialValue: 'admin123',
                  rules: [{ required: true, message: '请输入您的密码，示例admin123' }]
                })(
                  <Input
                    size="large"
                    prefix={<LockOutlined />}
                    type="password"
                    placeholder="密码"
                  />
                )}
              </FormItem>
              <FormItem>
                <div style={{position: 'relative'}}>
                    {getFieldDecorator('code', {
                        initialValue: '',
                        rules: [{ required: true, message: '请输入您的验证码' }]
                    })(
                        <Input
                            size="large"
                            placeholder="验证码"
                        />
                    )}
                    <img style={{
                        position: 'absolute',
                        right: '0px',
                        top: '2px',
                        bottom: '0px' }} src={`data:image/png;base64,${login.user.img}`}/>
                </div>
              </FormItem>
              <FormItem>
                {/*{getFieldDecorator('remember', {*/}
                  {/*valuePropName: 'checked',*/}
                  {/*initialValue: true*/}
                {/*})(<Checkbox>记住我</Checkbox>)}*/}
                {/*<Link className="login-form-forgot" to="#">*/}
                  {/*忘记密码*/}
                {/*</Link>*/}
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  登录
                </Button>
                {/*<div className="new-user">*/}
                  {/*新用户？<Link to="/sign/register">现在注册</Link>*/}
                {/*</div>*/}
              </FormItem>
            </Form>
          </Spin>
        </Content>
      </Layout>
    );
  }
}

export default Form.create()(Login);
